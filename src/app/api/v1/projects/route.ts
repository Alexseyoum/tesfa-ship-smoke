import { NextResponse } from "next/server";
import { z } from "zod";
import { createProject, listProjects } from "@/lib/store";
import { requireOps } from "@/lib/auth";

const createProjectSchema = z.object({
  name: z.string().min(2),
  clientName: z.string().min(2),
  location: z.string().min(2),
});

export async function GET() {
  return NextResponse.json({ projects: await listProjects() });
}

export async function POST(req: Request) {
  try {
    requireOps(req);
    const body = createProjectSchema.parse(await req.json());

    const project = await createProject(body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request payload";
    const status = message.includes("Forbidden") ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
