import { NextResponse } from "next/server";
import { predict, validateInput } from "@/lib/model";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 8_192) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    const input = validateInput(await request.json());
    return NextResponse.json(predict(input), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (cause) {
    return NextResponse.json(
      { error: cause instanceof Error ? cause.message : "Invalid request." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
