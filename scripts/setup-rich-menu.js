const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Load Environment Variables
const envPath = path.resolve(__dirname, '../.env.local');
let channelAccessToken = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/LINE_CHANNEL_ACCESS_TOKEN=(.+)/);
    if (match) {
        channelAccessToken = match[1].trim().replace(/^["']|["']$/g, '');
    }
} catch (e) {
    console.error('Could not read .env.local');
}

if (!channelAccessToken) {
    console.error('Error: LINE_CHANNEL_ACCESS_TOKEN not found in .env.local');
    console.error('Please ensure you have configured it.');
    process.exit(1);
}

const LINE_API_URL = 'https://api.line.me/v2/bot/richmenu';
const LINE_BLOB_URL = 'https://api-data.line.me/v2/bot/richmenu';

async function createRichMenu(name, chatBarText, areas, imagePath) {
    console.log(`Creating Rich Menu: ${name}...`);

    // 1. Create Menu
    const menuData = {
        size: { width: 1200, height: name === 'Register' ? 405 : 810 },
        selected: false,
        name: name,
        chatBarText: chatBarText,
        areas: areas
    };

    const createRes = await fetch(LINE_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${channelAccessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
    });

    if (!createRes.ok) {
        const err = await createRes.text();
        throw new Error(`Failed to create menu ${name}: ${err}`);
    }

    const { richMenuId } = await createRes.json();
    console.log(`  - Created ID: ${richMenuId}`);

    // 2. Upload Image
    console.log(`  - Uploading Image: ${imagePath}...`);
    const imageBuffer = fs.readFileSync(imagePath);

    // Determine content type based on extension
    const ext = path.extname(imagePath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    const uploadRes = await fetch(`${LINE_BLOB_URL}/${richMenuId}/content`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${channelAccessToken}`,
            'Content-Type': contentType
        },
        body: imageBuffer // node-fetch handles buffer
    });

    if (!uploadRes.ok) {
        const err = await uploadRes.text();
        throw new Error(`Failed to upload conversation image for ${name}: ${err}`);
    }
    console.log('  - Image Uploaded Successfully.');

    return richMenuId;
}

// Define Areas
// 1200x810 (Default/Pending) -> 2x2 Grid
const areasDefault = [
    // Top-Left: Profile (0,0) to (600,405)
    { bounds: { x: 0, y: 0, width: 600, height: 405 }, action: { type: 'postback', data: 'action=my_profile' } },
    // Top-Right: Practice (600,0) to (600,405)
    { bounds: { x: 600, y: 0, width: 600, height: 405 }, action: { type: 'postback', data: 'action=practice' } },
    // Bottom-Left: Feedback (0,405) to (600,405)
    { bounds: { x: 0, y: 405, width: 600, height: 405 }, action: { type: 'postback', data: 'action=feedback_mode' } },
    // Bottom-Right: Submit (600,405) to (600,405)
    { bounds: { x: 600, y: 405, width: 600, height: 405 }, action: { type: 'postback', data: 'action=submit_mode' } }
];

// 1200x405 (Register) -> Full width
const areasRegister = [
    { bounds: { x: 0, y: 0, width: 1200, height: 405 }, action: { type: 'postback', data: 'action=register' } }
];

async function main() {
    try {
        const registerId = await createRichMenu(
            'Register',
            'Register Now',
            areasRegister,
            path.resolve(__dirname, '../public/img/richmenu/menu_register.jpg')
        );

        const defaultId = await createRichMenu(
            'Default',
            'Open Menu',
            areasDefault,
            path.resolve(__dirname, '../public/img/richmenu/menu_default.jpg')
        );

        const pendingId = await createRichMenu(
            'Task Pending',
            'Submit Task!',
            areasDefault, // Same areas, different image
            path.resolve(__dirname, '../public/img/richmenu/menu_pending.jpg')
        );

        console.log('\nSUCCESS! Add these to your .env.local and Vercel Environment Variables:');
        console.log('---------------------------------------------------');
        console.log(`LINE_RICH_MENU_ID_REGISTER=${registerId}`);
        console.log(`LINE_RICH_MENU_ID_DEFAULT=${defaultId}`);
        console.log(`LINE_RICH_MENU_ID_TASK_PENDING=${pendingId}`);
        console.log('---------------------------------------------------');

    } catch (error) {
        console.error('Script failed:', error);
    }
}

main();
