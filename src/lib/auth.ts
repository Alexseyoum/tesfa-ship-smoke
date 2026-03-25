import type { UserRole } from "@prisma/client";

export function getRoleFromHeaders(req: Request): UserRole {
  const role = req.headers.get("x-role")?.toUpperCase();
  if (role === "OPS" || role === "CLIENT") return role;
  return "OPS";
}

export function requireOps(req: Request) {
  const role = getRoleFromHeaders(req);
  if (role !== "OPS") throw new Error("Forbidden: OPS role required");
}
