import { prisma } from "@/lib/prisma";
import type { ProjectStatus } from "@/lib/types";
import { assertTransition } from "@/lib/workflow";

export async function createProject(input: {
  name: string;
  clientName: string;
  location: string;
}) {
  return prisma.project.create({
    data: {
      name: input.name,
      clientName: input.clientName,
      location: input.location,
      status: "intake",
    },
  });
}

export async function listProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function updateProjectStatus(id: string, nextStatus: ProjectStatus) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new Error("Project not found");

  assertTransition(project.status as ProjectStatus, nextStatus);

  return prisma.project.update({
    where: { id },
    data: { status: nextStatus },
  });
}

export async function addEvidence(
  projectId: string,
  itemId: string,
  input: { note?: string; fileUrl?: string },
) {
  const project = await getProject(projectId);
  if (!project) throw new Error("Project not found");

  return prisma.complianceEvidence.create({
    data: {
      projectId,
      itemId,
      note: input.note,
      fileUrl: input.fileUrl,
    },
  });
}

export async function completeHandover(projectId: string) {
  const project = await getProject(projectId);
  if (!project) throw new Error("Project not found");

  const updated = await updateProjectStatus(projectId, "handover_complete");
  const complianceEvidenceCount = await prisma.complianceEvidence.count({
    where: { projectId },
  });

  return {
    project: updated,
    handoverPacket: {
      projectId,
      completedAt: new Date().toISOString(),
      complianceEvidenceCount,
      summary: `Handover completed for ${updated.name}`,
    },
  };
}
