import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: { isRegistered: true },
            select: {
                id: true,
                thaiName: true,
                chineseName: true,
                university: true,
                totalPoints: true,
                currentLevel: true,
                _count: {
                    select: {
                        submissions: true,
                        badges: true,
                    },
                },
            },
            orderBy: { totalPoints: "desc" },
            take: 50,
        });

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            thaiName: user.thaiName || "ไม่ระบุ",
            chineseName: user.chineseName || "-",
            university: user.university || "-",
            level: user.currentLevel,
            points: user.totalPoints,
            submissions: user._count.submissions,
            badges: user._count.badges,
        }));

        return NextResponse.json(leaderboard);
    } catch (error) {
        console.error("Leaderboard API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
