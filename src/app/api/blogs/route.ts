import { NextResponse } from "next/server";
import { blogs } from "./data";

export async function GET() {
  return NextResponse.json(blogs);
}
