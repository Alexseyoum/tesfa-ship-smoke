import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOps } from "@/lib/auth";
import { updateProjectStatus } from "@/lib/store";

const statusSchema = z.object({
  status: z.enum([
    "intake",
    "survey",
    "proposal_approved",
    "installation",
    "commissioning",
    "handover_complete",
  ]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireOps(req);
    const body = statusSchema.parse(await req.json());
    const { id } = await params;

    const project = await updateProjectStatus(id, body.status);
    return NextResponse.json({ project });
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
