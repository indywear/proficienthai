import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AIService } from '@/lib/ai/service';
import * as line from '@line/bot-sdk';

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

const client = new line.messagingApi.MessagingApiClient(config);

export async function GET(request: Request) {
    // Check auth (e.g. secret header) for Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // return new NextResponse('Unauthorized', { status: 401 }); 
        // Commented out for dev convenience, uncomment for prod
    }

    // Find inactive users (e.g. no activity in last 3 days)
    // Here using a simplified query or mock. Ideally join with activity_logs.
    // For demo, let's fetch all users and check 'last_activity_at'

    // Assuming we update 'last_activity_at' on every interaction (need middleware or trigger)
    // For now, let's just nudge everyone who hasn't been nudged today.

    const { data: usersData } = await supabase.from('users').select('line_id, display_name');
    const users = usersData as { line_id: string; display_name: string }[] | null;

    if (!users) return NextResponse.json({ processed: 0 });

    let count = 0;
    for (const user of users) {
        // Logic to check inactivity...
        const daysInactive = 3; // Mock value
        if (daysInactive >= 3) {
            const nudgeMsg = await AIService.generateSmartNudge(user.display_name, daysInactive);

            await client.pushMessage({
                to: user.line_id,
                messages: [{ type: 'text', text: nudgeMsg }]
            });
            count++;
        }
    }

    return NextResponse.json({ processed: count });
}
