export interface User {
    id: string;
    line_id: string;
    display_name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    points: number;
    xp: number;
    streak: number;
}

export interface Task {
    id: string;
    title: string;
    week: number;
    rubric: string | Record<string, unknown>;
}

export interface Submission {
    id: string;
    task_id: string;
    score_details: {
        grammar: number;
        vocab: number;
        organization: number;
        task_response: number;
    };
    total_score: number;
    submitted_at: string;
}
