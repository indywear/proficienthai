import OpenAI from 'openai';

const apiKey = process.env.OPENROUTER_API_KEY;
const siteUrl = process.env.OPENROUTER_SITE_URL || 'http://localhost:3000';
const siteName = process.env.OPENROUTER_SITE_NAME || 'ProficienThAI';

if (!apiKey) {
    console.warn('OpenRouter API Key is missing. AI features will fallback or fail.');
}

export const aiClient = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    defaultHeaders: {
        'HTTP-Referer': siteUrl,
        'X-Title': siteName,
    },
});

export const MODEL_NAME = 'anthropic/claude-3.5-sonnet'; // Using Claude as requested
