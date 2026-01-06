import { messagingApi } from '@line/bot-sdk';
import { User } from '@/types';

export const getProfileFlex = (user: User): messagingApi.FlexMessage => {
    const metadata = user.metadata || {};

    const createRow = (label: string, value: string, field: string): messagingApi.FlexComponent => ({
        type: 'box',
        layout: 'horizontal',
        margin: 'md',
        contents: [
            { type: 'text', text: label, color: '#94a3b8', size: 'xs', flex: 1 },
            { type: 'text', text: value || '-', color: '#1e293b', size: 'xs', flex: 2, wrap: true },
            {
                type: 'text',
                text: 'EDIT',
                color: '#3b82f6',
                size: 'xxs',
                flex: 0,
                align: 'end',
                action: { type: 'postback', label: 'Edit', data: `action=edit_profile&field=${field}` }
            }
        ]
    });

    return {
        type: 'flex',
        altText: 'My Profile',
        contents: {
            type: 'bubble',
            styles: { header: { backgroundColor: '#0f172a' } },
            header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    { type: 'text', text: 'SCHOLAR IDENTITY', color: '#fbbf24', size: 'xxs', weight: 'bold' },
                    { type: 'text', text: user.display_name, color: '#ffffff', size: 'xl', weight: 'bold', margin: 'sm' },
                    { type: 'text', text: user.level || 'Beginner', color: '#cbd5e1', size: 'xs', margin: 'xs' }
                ]
            },
            body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    createRow('Name (CN)', (metadata.name_cn as string), 'name_cn'),
                    createRow('Student ID', user.student_id as string, 'student_id'),
                    createRow('University', user.university as string, 'university'),
                    createRow('Email', (metadata.email as string), 'email'),
                    createRow('Nationality', (metadata.nationality as string), 'nationality'),
                ]
            }
        }
    };
};
