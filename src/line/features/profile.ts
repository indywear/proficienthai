import { supabase } from '@/lib/supabase';
import { messagingApi } from '@line/bot-sdk';
import { getProfileFlex } from '../templates/profile';

export async function showProfile(userId: string, client: messagingApi.MessagingApiClient, replyToken: string) {
    const { data: user } = await supabase.from('users').select('*').eq('line_id', userId).single();
    if (!user) {
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Profile not found. Please register first.' }] });
        return;
    }

    const flex = getProfileFlex(user);
    await client.replyMessage({ replyToken, messages: [flex] });
}

export async function handleEditProfile(userId: string, field: string, client: messagingApi.MessagingApiClient, replyToken: string) {
    // Map field to Registration State
    // Fields: name_cn, student_id, university, email, nationality
    const fieldMap: Record<string, string> = {
        'name_cn': 'ASK_NAME_CN',
        'student_id': 'ASK_STUDENT_ID',
        'university': 'ASK_UNIVERSITY',
        'email': 'ASK_EMAIL',
        'nationality': 'ASK_NATIONALITY'
    };

    const state = fieldMap[field];

    if (state) {
        // Update user state to specific step
        // We might need to handle the "Next" step differently if editing just one field.
        // For simplicity, we reuse the ASK state but we need to ensure the flow doesn't force re-doing everything.
        // A better approach for "Edit" is a specific EDIT_ mode or just one-off state.

        // Let's rely on a simplified "EDIT_ONE_OFF" concept.
        // But reusing 'state' string in metadata is easiest.

        // We will misuse the 'state' to ask for that specific field.
        // And we need to know we are in "EDIT_MODE" to return to "COMPLETED" immediately after one input.
        // Let's append a flag e.g., 'ASK_NAME_CN|EDIT'

        const newState = `${state}|EDIT`;

        const { data } = await supabase.from('users').select('metadata').eq('line_id', userId).single();
        const currentMeta = data?.metadata || {};
        await supabase.from('users').update({ metadata: { ...currentMeta, state: newState } }).eq('line_id', userId);

        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: `Please enter new value for ${field}:` }] });
    } else {
        await client.replyMessage({ replyToken, messages: [{ type: 'text', text: 'Cannot edit this field.' }] });
    }
}
