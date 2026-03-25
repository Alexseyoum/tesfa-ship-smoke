# ERo Elevator Installation MVP

Pilot-ready operations dashboard for elevator installation workflow tracking.

## What this MVP includes

- Next.js app with App Router
- Prisma + SQLite data layer
- Project lifecycle workflow with enforced status transitions
- Role-protected write APIs (`x-role: OPS`)
- Compliance evidence capture
- Handover completion endpoint with packet summary
- Basic dashboard UI listing active projects

## Relative project structure

```text
ero-mvp/
  src/
    app/
      page.tsx
      api/v1/projects/route.ts
      api/v1/projects/[id]/status/route.ts
      api/v1/projects/[id]/compliance-items/[itemId]/evidence/route.ts
      api/v1/projects/[id]/handover/complete/route.ts
    lib/
      auth.ts
      prisma.ts
      store.ts
      workflow.ts
      types.ts
  prisma/
    schema.prisma
```

## Run locally

```bash
npm install
npm run dev
```

## API quickstart

### Create project

`POST /api/v1/projects`

Body:

```json
{
  "name": "Westlands Tower Lift Upgrade",
  "clientName": "Skyline Properties",
  "location": "Nairobi"
}
```

### Update project status

`PATCH /api/v1/projects/:id/status`

Body:

```json
{
  "status": "survey"
}
```

### Add compliance evidence

`POST /api/v1/projects/:id/compliance-items/:itemId/evidence`

Body:

```json
{
  "note": "Load test passed",
  "fileUrl": "https://example.com/evidence/load-test.pdf"
}
```

### Complete handover

`POST /api/v1/projects/:id/handover/complete`

Returns updated project status and handover packet summary.
