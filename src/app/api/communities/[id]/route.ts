import { db } from "@/config/db";
import { communities } from "@/models/communities";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const community = await db
      .select()
      .from(communities)
      .where(eq(communities.id, params.id));
    if (community.length === 0) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 });
    }
    return NextResponse.json(community[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch community" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, category } = await request.json();
    const updatedCommunity = await db
      .update(communities)
      .set({ name, description, category })
      .where(eq(communities.id, params.id))
      .returning();
    if (updatedCommunity.length === 0) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCommunity[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update community" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedCommunity = await db
      .delete(communities)
      .where(eq(communities.id, params.id))
      .returning();
    if (deletedCommunity.length === 0) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Community deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete community" },
      { status: 500 }
    );
  }
}
