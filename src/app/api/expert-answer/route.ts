// app/api/expert-answer/route.ts
import { db } from "@/config/db";
import { answers } from "@/models/knowledge";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { knowledgePostId, answer } = await req.json();

        if (!knowledgePostId || !answer) {
            return NextResponse.json(
                { error: "Knowledge post ID and answer are required" },
                { status: 400 }
            );
        }

        // Store expert answer
        const expertAnswer = await db
            .insert(answers)
            .values({
                knowledgePostId,
                userId: session.user.id,
                content: answer,
                answerType: "EXPERT",
                isVerified: false, // Can be verified by other experts later
            })
            .returning();

        return NextResponse.json(expertAnswer[0]);

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}