import { messagingApi } from '@line/bot-sdk';
import { User } from '@/types';

export const getDashboardFlex = (user: User): messagingApi.FlexMessage => {
    const level = user.level || 'Beginner';
    const points = user.points || 0;

    return {
        type: 'flex',
        altText: 'Your Dashboard',
        contents: {
            type: 'bubble',
            styles: {
                header: { backgroundColor: '#0f172a' },
                body: { backgroundColor: '#ffffff' },
            },
            header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: 'SCHOLAR DASHBOARD', // Capitalized for premium feel
                        color: '#fbbf24',
                        weight: 'bold',
                        size: 'sm',
                        align: 'center',

                    },
                    {
                        type: 'text',
                        text: user.display_name || 'Student',
                        color: '#ffffff',
                        weight: 'bold',
                        size: 'xl',
                        align: 'center',
                        margin: 'md',
                    },
                    {
                        type: 'text',
                        text: `Level: ${level} | Points: ${points} `,
                        color: '#cbd5e1',
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
                        type: 'box',
                        layout: 'vertical',
                        margin: 'lg',
                        contents: [
                            { type: 'text', text: 'Weekly Progress', color: '#64748b', size: 'xs', weight: 'bold' },
                            {
                                type: 'box',
                                layout: 'horizontal',
                                margin: 'sm',
                                contents: [
                                    { type: 'box', layout: 'vertical', width: '70%', backgroundColor: '#e2e8f0', height: '6px', cornerRadius: '3px', contents: [] }, // Background Bar
                                    { type: 'box', layout: 'vertical', width: '40%', backgroundColor: '#3b82f6', height: '6px', cornerRadius: '3px', position: 'absolute', contents: [] }, // Progress (Example 40%)
                                ],
                            },
                            { type: 'text', text: '2/5 Tasks Completed', size: 'xs', color: '#94a3b8', margin: 'xs', align: 'end' },
                        ],
                    },
                    {
                        type: 'separator',
                        color: '#f1f5f9',
                        margin: 'lg',
                    },
                    {
                        type: 'box',
                        layout: 'vertical',
                        margin: 'lg',
                        spacing: 'sm',
                        contents: [
                            {
                                type: 'button',
                                action: { type: 'uri', label: 'View Full Analytics', uri: 'https://proficienthai.vercel.app/dashboard' },
                                style: 'secondary',
                                color: '#1e293b',
                                height: 'sm',
                            },
                        ],
                    },
                ],
            },
        },
    };
};
