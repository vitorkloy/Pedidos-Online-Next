import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import * as authService from "../../services/authService";

export async function GET() {
  try {
    await connectDB();
    const user = authService.getCurrentUser();
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro no servidor" },
      { status: 500 }
    );
  }
}
