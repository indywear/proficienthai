import { supabase } from '@/lib/supabase';
import { messagingApi } from '@line/bot-sdk';
import { AIService } from '@/lib/ai/service';
import { getFeedbackFlex } from '../templates/feedback';

export async function handleSubmitRequest(userId: string, text: string, client: messagingApi.MessagingApiClient, replyToken: string) {
    // 1. Check Active Task
    const { data: task } = await supabase.from('tasks').select('*').eq('is_active', true).single();

    if (!task) {
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'No active task at the moment. / 目前没有本周任务。' }] });
        await updateUserState(userId, 'NORMAL');
        return;
    }

    await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Submitting your work... / 正在提交您的作业...' }] });

    try {
        // 2. AI Grading
        const rubric = typeof task.rubric === 'string' ? task.rubric : JSON.stringify(task.rubric);
        const result = await AIService.evaluateSubmission(text, rubric);

        // 3. Save to DB
        const { data: user } = await supabase.from('users').select('id').eq('line_id', userId).single();
        if (user) {
            await supabase.from('submissions').insert({
                user_id: user.id,
                task_id: task.id,
                content: text,
                feedback: result.feedback,
                score_details: result.score_details,
                total_score: result.score
            });

            // 4. Update Points
            await supabase.rpc('increment_points', { p_user_id_line: userId, p_points: 20 }); // Big points for submission
        }

        // 5. Reply
        const flex = getFeedbackFlex(result.score, result.feedback, result.score_details);
        await client.pushMessage({ to: userId, messages: [flex] });

        // 6. Reset State
        await updateUserState(userId, 'NORMAL');

    } catch (err) {
        console.error('Submit Error:', err);
        await client.pushMessage({ to: userId, messages: [{ type: 'text', text: 'Error submitting. Try again.' }] });
        await updateUserState(userId, 'NORMAL');
    }
}

async function updateUserState(userId: string, state: string) {
    const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
    const currentMeta = data?.metadata || {};
    await supabase.from('users').update({ metadata: { ...currentMeta, state } }).eq('line_id', userId);
}
