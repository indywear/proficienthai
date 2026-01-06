import * as line from '@line/bot-sdk';

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

const client = new line.messagingApi.MessagingApiClient(config);

// IDs would typically be stored in DB or Config after creation
export const RICH_MENU_IDS = {
    DEFAULT: 'richmenu-default-id-placeholder',
    TASK_PENDING: 'richmenu-task-pending-id-placeholder',
    REGISTER: 'richmenu-register-id-placeholder',
};

export async function linkRichMenuToUser(userId: string, menuType: keyof typeof RICH_MENU_IDS) {
    const menuId = RICH_MENU_IDS[menuType];
    if (!menuId) return;

    await client.linkRichMenuIdToUser(userId, menuId);
}

// Function to run once (e.g., via script) to create menus
export async function createDefaultRichMenus() {
    // Logic to create rich menus using client.createRichMenu(...)
    // This is a placeholder as it requires Image Uploading logic which is complex for a single file agent
    console.log('Rich Menu creation logic goes here');
}

export async function determineUserMenu(userState: string): Promise<keyof typeof RICH_MENU_IDS> {
    if (userState === 'UNREGISTERED') return 'REGISTER';
    if (userState === 'HAS_PENDING_TASK') return 'TASK_PENDING';
    return 'DEFAULT';
}
