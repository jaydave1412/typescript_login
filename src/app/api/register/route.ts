import { connect } from "@/lib/database/database";
import { User, userModel } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const connection = await connect();

    const { name, username, password, role, isAdmin } = body;
    const userExists = await userModel.findOne({ username });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists", data: null },

        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      username,
      password: password,
      role,
      isAdmin,
    });
    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "User Created",
        data: savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        data: error,
      },
      { status: 500 }
    );
  }
}
