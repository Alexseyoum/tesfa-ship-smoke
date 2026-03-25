import { NextResponse } from "next/server";
import { z } from "zod";
import { addEvidence } from "@/lib/store";
import { requireOps } from "@/lib/auth";

const evidenceSchema = z.object({
  note: z.string().min(2).optional(),
  fileUrl: z.string().url().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  try {
    requireOps(req);
    const body = evidenceSchema.parse(await req.json());
    const { id, itemId } = await params;

    const evidence = await addEvidence(id, itemId, body);
    return NextResponse.json({ evidence }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request payload";
    const status =
      message.includes("Forbidden")
        ? 403
        : message.includes("not found")
          ? 404
          : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
