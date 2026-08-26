import { NextResponse } from "next/server";
import model from "@/generated/model-export.json";

export function GET() {
  return NextResponse.json({ status: "ready", model_version: model.model_version });
}
