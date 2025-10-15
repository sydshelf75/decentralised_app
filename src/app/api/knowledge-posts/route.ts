// app/api/knowledge-posts/route.ts
import { db } from "@/config/db";
import { knowledgePosts, answers } from "@/models/knowledge";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get all knowledge posts with their answers
    const allPosts = await db
      .select({
        post: knowledgePosts,
        answer: answers,
      })
      .from(knowledgePosts)
      .leftJoin(answers, eq(knowledgePosts.id, answers.knowledgePostId))
      .orderBy(desc(knowledgePosts.createdAt));

    const postsWithAnswers = allPosts.reduce((acc, row) => {
      if (!row.post) return acc; // <-- defensive check

      const existingPost = acc.find(p => p.id === row.post.id);

      if (existingPost) {
        if (row.answer) existingPost.answers.push(row.answer);
      } else {
        acc.push({
          ...row.post,
          answers: row.answer ? [row.answer] : [],
        });
      }

      return acc;
    }, [] as any[]);

    return NextResponse.json(postsWithAnswers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch knowledge posts" },
      { status: 500 }
    );
  }

}

export async function POST(request: Request) {
  try {
    const { userId, title, content } = await request.json();
    const newPost = await db
      .insert(knowledgePosts)
      .values({ userId, title, content })
      .returning();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create knowledge post" },
      { status: 500 }
    );
  }
}