import { db } from "@/config/db";
import { knowledgePosts } from "@/models/knowledge";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await db
      .select()
      .from(knowledgePosts)
      .where(eq(knowledgePosts.id, params.id));
    if (post.length === 0) {
      return NextResponse.json(
        { error: "Knowledge post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch knowledge post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await request.json();
    const updatedPost = await db
      .update(knowledgePosts)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(knowledgePosts.id, params.id))
      .returning();
    if (updatedPost.length === 0) {
      return NextResponse.json(
        { error: "Knowledge post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update knowledge post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedPost = await db
      .delete(knowledgePosts)
      .where(eq(knowledgePosts.id, params.id))
      .returning();
    if (deletedPost.length === 0) {
      return NextResponse.json(
        { error: "Knowledge post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Knowledge post deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete knowledge post" },
      { status: 500 }
    );
  }
}
