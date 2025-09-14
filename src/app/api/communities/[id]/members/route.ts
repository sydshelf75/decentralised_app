import { db } from "@/config/db";
import { communityMemberships } from "@/models/communities";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const members = await db
      .select()
      .from(communityMemberships)
      .where(eq(communityMemberships.communityId, params.id));
    return NextResponse.json(members);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch community members" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const newMember = await db
      .insert(communityMemberships)
      .values({ communityId: params.id, userId })
      .returning();
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add member to community" },
      { status: 500 }
    );
  }
}
