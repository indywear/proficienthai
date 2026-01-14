// Game Logic Exports
export * from './vocabulary';
export * from './fillBlank';
export * from './wordOrder';
export * from './sentenceConstruction';

// Game Types
export type GameType = 'CHINESE_VOCAB' | 'FILL_BLANK' | 'WORD_ORDER' | 'SENTENCE_CONSTRUCTION';

export interface GameState {
    gameType: GameType;
    questions: string[];  // Question IDs
    currentIndex: number;
    correctCount: number;
    answers: string[];
    isCompleted: boolean;
}

export function getGameName(gameType: GameType): string {
    switch (gameType) {
        case 'CHINESE_VOCAB':
            return 'คำศัพท์จีน-ไทย';
        case 'FILL_BLANK':
            return 'เติมคำในช่องว่าง';
        case 'WORD_ORDER':
            return 'เรียงคำให้เป็นประโยค';
        case 'SENTENCE_CONSTRUCTION':
            return 'แต่งประโยค';
        default:
            return 'เกม';
    }
}

export function getGameEmoji(gameType: GameType): string {
    switch (gameType) {
        case 'CHINESE_VOCAB':
            return '🇨🇳';
        case 'FILL_BLANK':
            return '📝';
        case 'WORD_ORDER':
            return '🔤';
        case 'SENTENCE_CONSTRUCTION':
            return '✍️';
        default:
            return '🎮';
    }
}
