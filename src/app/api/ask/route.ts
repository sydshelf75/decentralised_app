// app/api/ask/route.ts
import { db } from "@/config/db";
import { answers, knowledgePosts, answerTypeEnum } from "@/models/knowledge";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const { question } = await req.json();

        if (!question) {
            return NextResponse.json({ error: "Question is required" }, { status: 400 });
        }

        // 1. Create a new knowledge post
        const newKnowledgePost = await db
            .insert(knowledgePosts)
            .values({
                userId,
                title: question,
                content: null,
            })
            .returning();

        const knowledgePostId = newKnowledgePost[0].id;

        // 2. Get AI answer
        const ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY!, // safer than hardcoding
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Please provide a comprehensive answer to this question: ${question}`,
        });

        const aiAnswer = response.text || "No answer generated.";

        // 3. Store AI answer
        const aiAnswerRecord = await db
            .insert(answers)
            .values({
                knowledgePostId,
                userId,
                content: aiAnswer,
                answerType: answerTypeEnum.enumValues[0],
                confidenceScore: 0.85,
                isVerified: false,
            })
            .returning();

        return NextResponse.json({
            knowledgePost: newKnowledgePost[0],
            aiAnswer: aiAnswerRecord[0],
            message: "Question posted and AI answer generated. Experts will provide additional answers soon.",
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
