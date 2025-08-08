import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import {connectToDB}  from "@/lib/mongodb";
import Board from "@/models/Boards";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const userId = await getUserFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const boards = await Board.find({ userId });
    return NextResponse.json({ boards }, { status: 200 });
  } catch (error) {
    console.error("GET /api/boards", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const userId = await getUserFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const board = await Board.create({ title, userId });

    return NextResponse.json({ board }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/boards error:", error.message);
    console.error("Validation errors:", error.errors);
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
