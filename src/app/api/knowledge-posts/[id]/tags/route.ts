import { db } from "@/config/db";
import { postTags } from "@/models/tags";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tags = await db
      .select()
      .from(postTags)
      .where(eq(postTags.postId, params.id));
    return NextResponse.json(tags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tags for the knowledge post" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { tagId } = await request.json();
    const newPostTag = await db
      .insert(postTags)
      .values({ postId: params.id, tagId })
      .returning();
    return NextResponse.json(newPostTag, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add tag to the knowledge post" },
      { status: 500 }
    );
  }
}
