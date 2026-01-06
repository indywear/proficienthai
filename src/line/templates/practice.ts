import { FlexMessage } from '@line/bot-sdk';

interface QuestionData {
    question: string;
    options: string[];
    correct_index: number;
    explanation?: string;
}

export const getPracticeFlex = (data: QuestionData): FlexMessage => {
    // data: { question: string, options: string[], correct_index: number, explanation: string }
    const buttons = data.options.map((option: string, index: number) => ({
        type: 'button',
        action: {
            type: 'postback',
            label: option,
            data: `action=answer&choice=${index}`
        },
        style: 'secondary',
        margin: 'sm'
    }));

    return {
        type: 'flex',
        altText: 'Practice Question',
        contents: {
            type: 'bubble',
            body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: 'DAILY PRACTICE',
                        weight: 'bold',
                        color: '#fbbf24',
                        size: 'xs'
                    },
                    {
                        type: 'text',
                        text: data.question,
                        wrap: true,
                        weight: 'bold',
                        size: 'md',
                        margin: 'md'
                    },
                    {
                        type: 'separator',
                        margin: 'lg'
                    },
                    {
                        type: 'box',
                        layout: 'vertical',
                        margin: 'lg',
                        contents: buttons
                    }
                ]
            }
        }
    };
};
