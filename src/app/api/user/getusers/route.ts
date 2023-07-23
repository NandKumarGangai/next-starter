import { NextResponse } from "next/server";
import users from "@/models/mockData/data.json"

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        data: users,
        success: true,
      }
    )
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
