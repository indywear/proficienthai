import { NextRequest, NextResponse } from 'next/server';
import * as line from '@line/bot-sdk';
import { handleEvent } from '@/line/service';

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

export async function POST(req: NextRequest) {
    if (!config.channelAccessToken || !config.channelSecret) {
        return NextResponse.json({ error: 'Configuration missing' }, { status: 500 });
    }

    const body = await req.text();
    const signature = req.headers.get('x-line-signature') || '';

    try {
        if (!line.validateSignature(body, config.channelSecret, signature)) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const events: line.WebhookEvent[] = JSON.parse(body).events;

        await Promise.all(events.map((event) => handleEvent(event)));

        return NextResponse.json({ status: 'ok' });
    } catch (err) {
        console.error('Webhook Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
