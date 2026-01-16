import { NextResponse } from "next/server";
import * as authService from "../../services/authService";

export async function POST() {
  authService.logout();
  return NextResponse.json(null, { status: 204 });
}
