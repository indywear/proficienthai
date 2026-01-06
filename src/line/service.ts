import * as line from '@line/bot-sdk';
import { getWelcomeFlex } from './templates/welcome';
import { supabase } from '@/lib/supabase';
import { handleRegistration, RegisterState } from './features/registration';

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

const client = new line.messagingApi.MessagingApiClient(config);

export async function handleEvent(event: line.WebhookEvent) {
    switch (event.type) {
        case 'message':
            if (event.message.type === 'text') {
                await handleText(event.source.userId!, event.message.text, event.replyToken);
            }
            break;
        case 'postback':
            await handlePostback(event.source.userId!, event.postback.data, event.replyToken);
            break;
        case 'follow':
            await handleFollow(event.source.userId!, event.replyToken);
            break;
    }
}

async function handleFollow(userId: string, replyToken: string) {
    // Check if user exists
    const { data: user } = await supabase.from('users').select('*').eq('line_id', userId).single();

    if (!user) {
        await supabase.from('users').insert({
            line_id: userId,
            display_name: 'Guest',
            metadata: { state: 'INIT' }
        });
    }

    const welcomeMsg = getWelcomeFlex();
    await client.replyMessage({
        replyToken: replyToken,
        messages: [welcomeMsg],
    });
}

import { handleFeedbackRequest } from './features/feedback';
import { handleSubmitRequest } from './features/submit';
import { startPractice, handlePracticeAnswer } from './features/practice';

import { showProfile, handleEditProfile } from './features/profile';

async function handleText(userId: string, text: string, replyToken: string) {
    // Check User State
    const { data: user } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
    const metadata = user?.metadata as Record<string, unknown> | null;
    const state = (metadata?.state as string) || 'COMPLETED';

    if (state.startsWith('ASK_') || state === 'INIT') {
        // Handle Edit Mode or Registration
        await handleRegistration(userId, text, state as RegisterState, client, replyToken);
        return;
    }

    if (state === 'FEEDBACK_MODE') {
        await handleFeedbackRequest(userId, text, client, replyToken);
        return;
    }

    if (state === 'SUBMIT_MODE') {
        await handleSubmitRequest(userId, text, client, replyToken);
        return;
    }

    // Normal Bot Logic
    await client.replyMessage({
        replyToken: replyToken,
        messages: [{ type: 'text', text: `You said: ${text}. Use the menu to interact!` }],
    });
}

async function handlePostback(userId: string, data: string, replyToken: string) {
    const params = new URLSearchParams(data);
    const action = params.get('action');

    if (action === 'register') {
        await handleRegistration(userId, undefined, 'INIT', client, replyToken);
    } else if (action === 'feedback_mode') {
        const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
        const currentMeta = data?.metadata || {};
        await supabase.from('users').update({ metadata: { ...currentMeta, state: 'FEEDBACK_MODE' } }).eq('line_id', userId);
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Send your draft (text) now. / 请发送您的草稿。' }] });
    } else if (action === 'submit_mode') {
        const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
        const currentMeta = data?.metadata || {};
        await supabase.from('users').update({ metadata: { ...currentMeta, state: 'SUBMIT_MODE' } }).eq('line_id', userId);
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Send your weekly task work now. / 请发送本周作业。' }] });
    } else if (action === 'practice') {
        await startPractice(userId, client, replyToken);
    } else if (action === 'answer') {
        const choice = parseInt(params.get('choice') || '0');
        await handlePracticeAnswer(userId, choice, client, replyToken);
    } else if (action === 'my_profile') {
        await showProfile(userId, client, replyToken);
    } else if (action === 'edit_profile') {
        const field = params.get('field') || '';
        await handleEditProfile(userId, field, client, replyToken);
    }
}
