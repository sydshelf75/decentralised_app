import { db } from "@/config/db";
import { tags } from "@/models/tags";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await db.select().from(tags).where(eq(tags.id, params.id));
    if (tag.length === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }
    return NextResponse.json(tag[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, color } = await request.json();
    const updatedTag = await db
      .update(tags)
      .set({ name, color })
      .where(eq(tags.id, params.id))
      .returning();
    if (updatedTag.length === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTag[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedTag = await db
      .delete(tags)
      .where(eq(tags.id, params.id))
      .returning();
    if (deletedTag.length === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}
