import { db } from "@/config/db";
import { communities } from "@/models/communities";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allCommunities = await db.select().from(communities);
    return NextResponse.json(allCommunities);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch communities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, category } = await request.json();
    const newCommunity = await db
      .insert(communities)
      .values({ name, description, category })
      .returning();
    return NextResponse.json(newCommunity, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create community" },
      { status: 500 }
    );
  }
}
