import { supabase } from '@/lib/supabase';
import { messagingApi } from '@line/bot-sdk';
import { linkRichMenuToUser } from '../richMenu';

export const REGISTER_STATES = [
    'INIT',
    'ASK_NAME_CN',
    'ASK_NAME_TH',
    'ASK_STUDENT_ID',
    'ASK_UNIVERSITY',
    'ASK_EMAIL',
    'ASK_NATIONALITY',
    'ASK_LEVEL',
    'ASK_CONSENT',
    'COMPLETED',
] as const;

export type RegisterState = typeof REGISTER_STATES[number];

export async function handleRegistration(userId: string, text: string | undefined, currentState: string, client: messagingApi.MessagingApiClient, replyToken: string) {
    // Simple state machine

    // Check for EDIT flag
    const isEditMode = currentState.endsWith('|EDIT');
    const baseState = isEditMode ? currentState.split('|')[0] : currentState;

    // Helper to reply
    const reply = async (msg: string | messagingApi.FlexMessage) => {
        const message = typeof msg === 'string' ? { type: 'text', text: msg } as messagingApi.TextMessage : msg;
        await client.replyMessage({ replyToken, messages: [message] });
    };

    const finishEdit = async () => {
        await updateUserState(userId, 'COMPLETED');
        await reply('Updated successfully.');
    };

    switch (baseState) {
        case 'INIT':
            await updateUserState(userId, 'ASK_NAME_CN');
            await reply('Please enter your Name (Chinese) / 请输入您的中文姓名:');
            break;

        case 'ASK_NAME_CN':
            if (!text) return;
            await updateUserData(userId, { metadata: { name_cn: text } });
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_NAME_TH');
            await reply('Please enter your Thai Name / 请输入您的泰语名字:');
            break;

        case 'ASK_NAME_TH':
            if (!text) return;
            await updateUserData(userId, { display_name: text });
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_STUDENT_ID');
            await reply('Please enter your Student ID (if any) / 请输入您的学生证号 (如果没有，请输入 - ):');
            break;

        case 'ASK_STUDENT_ID':
            if (!text) return;
            await updateUserData(userId, { student_id: text });
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_UNIVERSITY');
            await reply('Please enter your University (English) / 请输入您的大学名称 (英文):');
            break;

        case 'ASK_UNIVERSITY':
            if (!text) return;
            await updateUserData(userId, { university: text });
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_EMAIL');
            await reply('Please enter your Email / 请输入您的电子邮件:');
            break;

        case 'ASK_EMAIL':
            if (!text) return;
            await updateUserData(userId, { metadata: { email: text } }); // Appending to metadata
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_NATIONALITY');
            await reply('Please enter your Nationality / 请输入您的国籍:');
            break;

        case 'ASK_NATIONALITY':
            if (!text) return;
            await updateUserData(userId, { metadata: { nationality: text } });
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_LEVEL');
            // Use Quick Reply for level
            await client.replyMessage({
                replyToken,
                messages: [{
                    type: 'text',
                    text: 'Choose your Thai Level / 请选择您的泰语水平:',
                    quickReply: {
                        items: [
                            { type: 'action', action: { type: 'message', label: 'Beginner', text: 'Beginner' } },
                            { type: 'action', action: { type: 'message', label: 'Intermediate', text: 'Intermediate' } },
                            { type: 'action', action: { type: 'message', label: 'Advanced', text: 'Advanced' } },
                        ]
                    }
                }]
            });
            break;

        case 'ASK_LEVEL':
            if (!text || !['Beginner', 'Intermediate', 'Advanced'].includes(text)) {
                await reply('Please select from the options.');
                return;
            }
            await updateUserData(userId, { level: text });
            if (isEditMode) { await finishEdit(); return; }
            await updateUserState(userId, 'ASK_CONSENT');
            await reply('Do you consent to data usage for research? (Yes/No) / 您是否同意将数据用于研究？(Yes/No)');
            break;

        case 'ASK_CONSENT':
            // Finalize
            await updateUserState(userId, 'COMPLETED');
            await linkRichMenuToUser(userId, 'DEFAULT'); // Unlock main menu
            await reply('Registration Completed! You can now start learning. / 注册完成！您可以开始学习了。');
            break;
    }
}

async function updateUserState(userId: string, state: string) {
    // In a real app, this should be in a separate 'state' table or Redis. 
    // Here using Supabase 'metadata' -> 'state' for simplicity
    const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
    const currentMeta = data?.metadata || {};
    await supabase.from('users').update({ metadata: { ...currentMeta, state } }).eq('line_id', userId);
}

async function updateUserData(userId: string, updates: Record<string, unknown>) {
    // If updates contains metadata, we need to merge it carefully
    if (updates.metadata) {
        const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
        const currentMeta = (data?.metadata as Record<string, unknown>) || {};
        updates.metadata = { ...currentMeta, ...(updates.metadata as Record<string, unknown>) };
    }
    await supabase.from('users').update(updates).eq('line_id', userId);
}
