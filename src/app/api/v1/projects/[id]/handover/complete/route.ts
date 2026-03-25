import { NextResponse } from "next/server";
import { requireOps } from "@/lib/auth";
import { completeHandover } from "@/lib/store";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireOps(req);
    const { id } = await params;

    const result = await completeHandover(id);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not complete handover";
    const status =
      message.includes("Forbidden")
        ? 403
        : message.includes("not found")
          ? 404
          : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
