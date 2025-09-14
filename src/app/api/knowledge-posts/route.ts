import { db } from "@/config/db";
import { knowledgePosts } from "@/models/knowledge";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allPosts = await db.select().from(knowledgePosts);
    return NextResponse.json(allPosts);
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
