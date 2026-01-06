import { FlexMessage } from '@line/bot-sdk';

interface ScoreDetails {
    grammar: number;
    vocab: number;
    organization: number;
    task_response?: number; // Optional depending on use
}

export const getFeedbackFlex = (score: number, feedback: string, details: ScoreDetails): FlexMessage => {
    return {
        type: 'flex',
        altText: 'Your Feedback',
        contents: {
            type: 'bubble',
            body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: 'FEEDBACK REPORT',
                        weight: 'bold',
                        color: '#1e293b',
                        size: 'xs',
                        letterSpacing: '1px',
                    },
                    {
                        type: 'text',
                        text: `${score}/100`,
                        weight: 'bold',
                        size: '3xl',
                        color: score > 70 ? '#22c55e' : '#eab308', // Green for good, Yellow for ok
                        margin: 'md',
                    },
                    {
                        type: 'text',
                        text: feedback,
                        wrap: true,
                        color: '#475569',
                        margin: 'md',
                        size: 'sm',
                    },
                    {
                        type: 'box',
                        layout: 'vertical',
                        margin: 'lg',
                        spacing: 'sm',
                        contents: [
                            {
                                type: 'box',
                                layout: 'horizontal',
                                contents: [
                                    { type: 'text', text: 'Grammar', size: 'xs', color: '#64748b', flex: 1 },
                                    { type: 'text', text: `${details.grammar}/10`, size: 'xs', color: '#1e293b', align: 'end' },
                                ],
                            },
                            {
                                type: 'box',
                                layout: 'horizontal',
                                contents: [
                                    { type: 'text', text: 'Vocabulary', size: 'xs', color: '#64748b', flex: 1 },
                                    { type: 'text', text: `${details.vocab}/10`, size: 'xs', color: '#1e293b', align: 'end' },
                                ],
                            },
                        ],
                    },
                ],
            },
            footer: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'button',
                        action: { type: 'postback', label: 'Practice Weak Spots', data: `action=practice&focus=weakness` },
                        style: 'primary',
                        color: '#3b82f6',
                        height: 'sm'
                    }
                ]
            }
        },
    };
};
