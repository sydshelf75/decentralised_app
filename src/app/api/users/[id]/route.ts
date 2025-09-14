import { db } from "@/config/db";
import { users } from "@/models/users";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.select().from(users).where(eq(users.id, params.id));
    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { username, avatarUrl } = await request.json();
    const updatedUser = await db
      .update(users)
      .set({ username, avatarUrl })
      .where(eq(users.id, params.id))
      .returning();
    if (updatedUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, params.id))
      .returning();
    if (deletedUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
