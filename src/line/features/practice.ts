import { supabase } from '@/lib/supabase';
import { messagingApi } from '@line/bot-sdk';
import { AIService } from '@/lib/ai/service';
import { getPracticeFlex } from '../templates/practice';

// Initialize Practice Session
export async function startPractice(userId: string, client: messagingApi.MessagingApiClient, replyToken: string) {
    const { data: user } = await supabase.from('users').select('*').eq('line_id', userId).single();

    // Get weaknesses (mock logic or DB)
    const weaknesses = ['Tone Rules', 'Spelling'];
    const level = user?.level || 'Beginner';

    try {
        const questionData = await AIService.generateAdaptiveQuestion(level, weaknesses);

        // Save question to state/DB to verify answer later (Simplified: pass answer in postback data for stateless check if simple, but better store in DB)
        // For security/cleanliness, storing in DB 'activity_logs' or 'practice_sessions' is better.
        // For this demo, we can embed the correct answer hash or index in the postback data (hashed).
        // Let's store in user metadata 'current_practice_answer'.

        await updateUserMeta(userId, { current_practice_answer: questionData.correct_index });

        const flex = getPracticeFlex(questionData);
        await client.replyMessage({ replyToken, messages: [flex] });

    } catch (err) {
        console.error(err);
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Error starting practice.' }] });
    }
}

export async function handlePracticeAnswer(userId: string, choiceIndex: number, client: messagingApi.MessagingApiClient, replyToken: string) {
    const { data: user } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
    const correctIndex = (user?.metadata as Record<string, unknown>)?.current_practice_answer;

    if (correctIndex === undefined) {
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Session expired.' }] });
        return;
    }

    const isCorrect = choiceIndex === correctIndex;

    if (isCorrect) {
        await supabase.rpc('increment_points', { p_user_id_line: userId, p_points: 10 });
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Correct! +10 Points! 🎉 / 答对了！' }] });
    } else {
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Incorrect. Keep trying! / 答错了，加油！' }] });
    }

    // Clear state
    await updateUserMeta(userId, { current_practice_answer: null });
}

async function updateUserMeta(userId: string, update: Record<string, unknown>) {
    const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
    const currentMeta = (data?.metadata as Record<string, unknown>) || {};
    await supabase.from('users').update({ metadata: { ...currentMeta, ...update } }).eq('line_id', userId);
}
