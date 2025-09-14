import { db } from "@/config/db";
import { tags } from "@/models/tags";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allTags = await db.select().from(tags);
    return NextResponse.json(allTags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, color } = await request.json();
    const newTag = await db.insert(tags).values({ name, color }).returning();
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
