export type ProjectStatus =
  | "intake"
  | "survey"
  | "proposal_approved"
  | "installation"
  | "commissioning"
  | "handover_complete";

export type Project = {
  id: string;
  name: string;
  clientName: string;
  location: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type ComplianceEvidence = {
  id: string;
  projectId: string;
  itemId: string;
  note?: string;
  fileUrl?: string;
  createdAt: string;
};
