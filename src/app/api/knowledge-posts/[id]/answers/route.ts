import { db } from "@/config/db";
import { answers } from "@/models/knowledge";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postAnswers = await db
      .select()
      .from(answers)
      .where(eq(answers.knowledgePostId, params.id));
    return NextResponse.json(postAnswers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch answers for the knowledge post" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, content, answerType, confidenceScore } = await request.json();
    const newAnswer = await db
      .insert(answers)
      .values({
        knowledgePostId: params.id,
        userId,
        content,
        answerType,
        confidenceScore,
      })
      .returning();
    return NextResponse.json(newAnswer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create answer for the knowledge post" },
      { status: 500 }
    );
  }
}
