import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    NextResponse.next();
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: "Something went wrong",
        data: error,
      },
      { status: 500 }
    );
  }
}
