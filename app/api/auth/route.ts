import { NextRequest, NextResponse } from "next/server";
import connectDB from "../config/db";
import * as authService from "../services/authService";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { action, ...data } = body;

    if (action === "signup") {
      const user = await authService.signup(data);
      return NextResponse.json(user, { status: 201 });
    } else if (action === "login") {
      const user = await authService.login(data);
      return NextResponse.json(user);
    } else if (action === "logout") {
      authService.logout();
      return NextResponse.json(null, { status: 204 });
    }

    return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro no servidor" },
      { status: err.message?.includes("já está cadastrado") ? 400 : 401 }
    );
  }
}

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
