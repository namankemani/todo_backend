import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import {connectToDB} from "@/lib/mongodb";
import Board from "@/models/Boards";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const userId = await getUserFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    const updatedBoard = await Board.findOneAndUpdate(
      { _id: params.id, userId },
      { title },
      { new: true }
    );

    if (!updatedBoard) {
      return NextResponse.json({ message: "Board not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ board: updatedBoard }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/boards/[id]", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const userId = await getUserFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const deletedBoard = await Board.findOneAndDelete({ _id: params.id, userId });

    if (!deletedBoard) {
      return NextResponse.json({ message: "Board not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Board deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/boards/[id]", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
