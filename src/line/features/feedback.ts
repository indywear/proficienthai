import { supabase } from '@/lib/supabase';
import { messagingApi } from '@line/bot-sdk';
import { AIService, AssessmentResult } from '@/lib/ai/service';
import { getFeedbackFlex } from '../templates/feedback';

export async function handleFeedbackRequest(userId: string, text: string, client: messagingApi.MessagingApiClient, replyToken: string) {
    // 1. Analyze with AI
    // We can use a default rubric for general feedback or fetch from active task
    const defaultRubric = "Evaluate grammar, vocabulary, and organization for a Thai learner.";

    await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Analyzing your draft... / 正在分析您的草稿...' }] });

    try {
        const result: AssessmentResult = await AIService.evaluateSubmission(text, defaultRubric);

        // 2. Calculate Points (Gamification)
        // +5 points for feedback request
        await supabase.rpc('increment_points', { p_user_id_line: userId, p_points: 5 });

        // 3. Send Result
        const flex = getFeedbackFlex(result.score, result.feedback, result.score_details);

        // Push message (since we used replyToken for "Analyzing...")
        // Actually, we can't reply twice with same token. So we should utilize Push or just wait.
        // Better UX: Don't send "Analyzing" via reply, or use Loading Animation (LINE feature) if available (limited).
        // Or just send the result directly. AI might take 3-5s. LINE timeout is a concern but usually 10-30s.
        // Let's rely on direct reply.

        await client.pushMessage({ to: userId, messages: [flex] });

        // 4. Update State back to NORMAL
        await updateUserState(userId, 'NORMAL');

    } catch (error) {
        console.error('AI Error:', error);
        await client.pushMessage({
            to: userId,
            messages: [{ type: 'text', text: 'Sorry, AI service is busy. Please try again later.' }]
        });
        await updateUserState(userId, 'NORMAL');
    }
}

async function updateUserState(userId: string, state: string) {
    const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
    const currentMeta = data?.metadata || {};
    await supabase.from('users').update({ metadata: { ...currentMeta, state } }).eq('line_id', userId);
}
