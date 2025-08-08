import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDB } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectToDB(); // connect to MongoDB
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Login successful ✅",
      token,
    });
  } catch (error: any) {
    console.error("Login Error:", error); // LOG THE ERROR
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
