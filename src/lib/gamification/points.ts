// =====================
// Points Configuration
// =====================

export const POINTS = {
    // Submissions
    SUBMIT_ON_TIME: 10,
    SUBMIT_EARLY: 15,
    SUBMIT_LATE: 5,

    // Feedback
    REQUEST_FEEDBACK: 5,
    REQUEST_FEEDBACK_REVISION: 7,

    // Practice
    PRACTICE_COMPLETE: 3,
    PRACTICE_PERFECT: 5,

    // Daily interaction
    DAILY_CHAT: 1,

    // Bonus
    CONSECUTIVE_WEEK_BONUS: 20,
};

// =====================
// Level Thresholds
// =====================

export const LEVEL_THRESHOLDS = [
    0,     // Level 1
    100,   // Level 2
    300,   // Level 3
    600,   // Level 4
    1000,  // Level 5
    1500,  // Level 6
    2100,  // Level 7
    2800,  // Level 8
    3600,  // Level 9
    4500,  // Level 10
];

export function calculateLevel(totalPoints: number): number {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (totalPoints >= LEVEL_THRESHOLDS[i]) {
            return i + 1;
        }
    }
    return 1;
}

export function getPointsForNextLevel(currentLevel: number): number {
    if (currentLevel >= LEVEL_THRESHOLDS.length) {
        // After max defined level, every 500 points = 1 level
        return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (currentLevel - LEVEL_THRESHOLDS.length + 1) * 500;
    }
    return LEVEL_THRESHOLDS[currentLevel];
}

export function getProgressToNextLevel(totalPoints: number, currentLevel: number): number {
    const currentThreshold = currentLevel <= LEVEL_THRESHOLDS.length
        ? LEVEL_THRESHOLDS[currentLevel - 1]
        : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (currentLevel - LEVEL_THRESHOLDS.length) * 500;

    const nextThreshold = getPointsForNextLevel(currentLevel);
    const pointsInCurrentLevel = totalPoints - currentThreshold;
    const pointsNeeded = nextThreshold - currentThreshold;

    return Math.round((pointsInCurrentLevel / pointsNeeded) * 100);
}

// =====================
// Badge Types
// =====================

export const BADGE_TYPES = {
    CURIOUS_LEARNER: {
        type: "CURIOUS_LEARNER",
        name: "Curious Learner",
        nameThai: "ผู้ใฝ่รู้",
        description: "Request feedback 10 times",
        requirement: 10,
        checkField: "feedbackCount",
    },
    DILIGENT_WRITER: {
        type: "DILIGENT_WRITER",
        name: "Diligent Writer",
        nameThai: "นักเขียนขยัน",
        description: "Submit 4 consecutive weeks",
        requirement: 4,
        checkField: "consecutiveWeeks",
    },
    EARLY_BIRD: {
        type: "EARLY_BIRD",
        name: "Early Bird",
        nameThai: "ส่งไว",
        description: "Submit early 3 times",
        requirement: 3,
        checkField: "earlySubmissions",
    },
    VOCAB_MASTER_100: {
        type: "VOCAB_MASTER_100",
        name: "Vocabulary Master",
        nameThai: "คำศัพท์ 100",
        description: "Learn 100 vocabulary words",
        requirement: 100,
        checkField: "vocabularyCount",
    },
    IMPROVER: {
        type: "IMPROVER",
        name: "Fast Improver",
        nameThai: "นักพัฒนา",
        description: "Improve scores 3 times in a row",
        requirement: 3,
        checkField: "improvementStreak",
    },
    PRACTICE_CHAMPION: {
        type: "PRACTICE_CHAMPION",
        name: "Practice Champion",
        nameThai: "แชมป์ฝึกฝน",
        description: "Complete 50 practice sessions",
        requirement: 50,
        checkField: "practiceCount",
    },
    PERFECT_SCORE: {
        type: "PERFECT_SCORE",
        name: "Perfect Score",
        nameThai: "คะแนนเต็ม",
        description: "Get 100/100 on a submission",
        requirement: 100,
        checkField: "perfectSubmission",
    },
};

// =====================
// Badge Checking
// =====================

interface UserStats {
    feedbackCount: number;
    consecutiveWeeks: number;
    earlySubmissions: number;
    vocabularyCount: number;
    improvementStreak: number;
    practiceCount: number;
    perfectSubmission: boolean;
    earnedBadges: string[];
}

export function checkEarnedBadges(stats: UserStats): string[] {
    const newBadges: string[] = [];

    for (const [key, badge] of Object.entries(BADGE_TYPES)) {
        // Skip if already earned
        if (stats.earnedBadges.includes(badge.type)) {
            continue;
        }

        const fieldValue = stats[badge.checkField as keyof UserStats];

        if (badge.checkField === "perfectSubmission") {
            if (fieldValue === true) {
                newBadges.push(badge.type);
            }
        } else if (typeof fieldValue === "number" && fieldValue >= badge.requirement) {
            newBadges.push(badge.type);
        }
    }

    return newBadges;
}

// =====================
// Points Award Helper
// =====================

export function formatPointsMessage(points: number, action: string): string {
    if (points > 0) {
        return `+${points} แต้ม (${action})`;
    }
    return "";
}
