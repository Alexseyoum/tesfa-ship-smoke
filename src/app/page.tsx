import { listProjects } from "@/lib/store";

const statusLabels = {
  intake: "Intake",
  survey: "Survey",
  proposal_approved: "Proposal Approved",
  installation: "Installation",
  commissioning: "Commissioning",
  handover_complete: "Handover Complete",
};

export default async function Home() {
  const projects = await listProjects();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">ERo Elevator Installation MVP</h1>
        <p className="text-slate-700">
          Commercial installation operations dashboard (pilot build).
        </p>

        <section className="rounded-xl border bg-white p-6 space-y-3">
          <h2 className="text-xl font-semibold">API quickstart</h2>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>
              Use header <code>x-role: OPS</code> for protected write actions.
            </li>
            <li>
              <code>POST /api/v1/projects</code>
            </li>
            <li>
              <code>PATCH /api/v1/projects/:id/status</code>
            </li>
            <li>
              <code>POST /api/v1/projects/:id/compliance-items/:itemId/evidence</code>
            </li>
            <li>
              <code>POST /api/v1/projects/:id/handover/complete</code>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">Project board</h2>
          {projects.length === 0 ? (
            <p className="text-sm text-slate-500">
              No projects yet. Create one via <code>POST /api/v1/projects</code>.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Project</th>
                    <th className="py-2">Client</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{p.name}</td>
                      <td className="py-2">{p.clientName}</td>
                      <td className="py-2">{p.location}</td>
                      <td className="py-2">{statusLabels[p.status]}</td>
                      <td className="py-2">{new Date(p.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
