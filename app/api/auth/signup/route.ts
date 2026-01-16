import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../config/db";
import * as authService from "../../services/authService";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await authService.signup(body);
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro no servidor" },
      { status: 400 }
    );
  }
}
