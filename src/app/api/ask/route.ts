import { db } from "@/config/db";
import { answers, answerTypeEnum } from "@/models/knowledge";
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


        const { question, knowledgePostId } = await req.json();

        if (!question || !userId) {
            return new Response(JSON.stringify({ error: "Question and userId are required" }), { status: 400 });
        }

        const ai = new GoogleGenAI({ apiKey: "AIzaSyCXxYDV8ZDQVgyHnYwyi65cPEnq5efiUcU" });

        const response = await ai.models.generateContentStream({
            model: "gemini-2.0-flash",
            // contents: "Write a story about a magic backpack.",
            contents: question
        });
        let text = "";
        for await (const chunk of response) {
            console.log(chunk.text);
            text += chunk.text;
        }

        // store in database
        const record = await db.insert(answers).values({
            knowledgePostId: knowledgePostId || null,
            userId,
            content: text,
            answerType: "AI",
            isVerified: false,
        }).returning()

        return NextResponse.json(record[0]);
    } catch (error: any) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}