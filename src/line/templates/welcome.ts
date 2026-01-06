import { FlexMessage } from '@line/bot-sdk';

export const getWelcomeFlex = (): FlexMessage => {
    return {
        type: 'flex',
        altText: 'Welcome to ProficienThAI',
        contents: {
            type: 'bubble',
            styles: {
                header: { backgroundColor: '#0f172a' }, // Deep Blue/Slate
                body: { backgroundColor: '#ffffff' },
                footer: { backgroundColor: '#f8fafc' },
            },
            header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: 'ProficienThAI',
                        weight: 'bold',
                        color: '#fbbf24', // Gold
                        size: 'xl',
                        align: 'center',
                    },
                    {
                        type: 'text',
                        text: 'Innovation in Thai Learning',
                        color: '#94a3b8',
                        size: 'xs',
                        align: 'center',
                        margin: 'sm',
                    },
                ],
            },
            body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: 'Welcome, Scholar.',
                        weight: 'bold',
                        size: 'lg',
                        margin: 'md',
                        color: '#1e293b',
                    },
                    {
                        type: 'text',
                        text: 'Please register to unlock your personalized learning journey.',
                        wrap: true,
                        color: '#475569',
                        margin: 'sm',
                    },
                    {
                        type: 'separator',
                        margin: 'lg',
                        color: '#e2e8f0',
                    },
                    {
                        type: 'box',
                        layout: 'vertical',
                        margin: 'lg',
                        spacing: 'sm',
                        contents: [
                            {
                                type: 'button',
                                action: {
                                    type: 'postback',
                                    label: 'Register Profile',
                                    data: 'action=register',
                                },
                                style: 'primary',
                                color: '#0f172a', // Dark theme button
                                height: 'sm',
                            },
                        ],
                    },
                ],
            },
        },
    };
};
