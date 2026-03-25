import type { ProjectStatus } from "./types";

const allowedTransitions: Record<ProjectStatus, ProjectStatus[]> = {
  intake: ["survey"],
  survey: ["proposal_approved"],
  proposal_approved: ["installation"],
  installation: ["commissioning"],
  commissioning: ["handover_complete"],
  handover_complete: [],
};

export function canTransition(current: ProjectStatus, next: ProjectStatus): boolean {
  return allowedTransitions[current].includes(next);
}

export function assertTransition(current: ProjectStatus, next: ProjectStatus): void {
  if (!canTransition(current, next)) {
    throw new Error(`Invalid transition from ${current} to ${next}`);
  }
}
