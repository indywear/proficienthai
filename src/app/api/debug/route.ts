import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Check env var
        const dbUrl = process.env.DATABASE_URL;
        const envStatus = dbUrl ? `Defined (starts with ${dbUrl.substring(0, 10)}...)` : "Undefined";

        // Test database connection
        const userCount = await prisma.user.count();
        return NextResponse.json({ status: "ok", userCount, env: envStatus });
    } catch (error: any) {
        console.error("Database Error:", error);

        // Re-check env var for error response
        const dbUrl = process.env.DATABASE_URL;
        const envStatus = dbUrl ? `Defined (starts with ${dbUrl.substring(0, 10)}...)` : "Undefined";

        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack,
            name: error.name,
            env: envStatus
        }, { status: 500 });
    }
}
