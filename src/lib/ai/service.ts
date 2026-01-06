import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: process.env.OPENROUTER_SITE_URL || 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL,
        'X-Title': process.env.OPENROUTER_SITE_NAME,
    },
});

export interface AssessmentResult {
    score: number;
    feedback: string;
    score_details: {
        grammar: number;
        vocab: number;
        organization: number;
        task_response?: number;
    };
}

export interface QuestionData {
    question: string;
    options: string[];
    correct_index: number;
    explanation?: string;
}

export class AIService {
    static async evaluateSubmission(text: string, rubric: string): Promise<AssessmentResult> {
        const prompt = `
      Evaluate the following Thai text based on this rubric: ${rubric}.
      Text: "${text}"
      
      Return a JSON object with:
      - score (0-100)
      - feedback (concise, in English or Chinese)
      - score_details (grammar, vocab, organization, task_response scores out of 10)
    `;

        const completion = await openai.chat.completions.create({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
        });

        const content = completion.choices[0].message?.content || '{}';
        return JSON.parse(content) as AssessmentResult;
    }

    static async generateAdaptiveQuestion(level: string, weaknesses: string[]): Promise<QuestionData> {
        const prompt = `Generate a Thai multiple-choice question for ${level} level, focusing on: ${weaknesses.join(', ')}. Return JSON with question, options (array of 4), correct_index (0-3), explanation.`;

        const completion = await openai.chat.completions.create({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
        });

        return JSON.parse(completion.choices[0].message?.content || '{}') as QuestionData;
    }

    static async generateSmartNudge(name: string, daysInactive: number): Promise<string> {
        const prompt = `Generate a short, funny, teen-style notification string in Chinese to nudge a user named ${name} who hasn't practiced Thai for ${daysInactive} days. Be friendly but urgent.`;

        const completion = await openai.chat.completions.create({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [{ role: 'user', content: prompt }],
        });

        return completion.choices[0].message?.content || 'Come back and practice!';
    }
}
