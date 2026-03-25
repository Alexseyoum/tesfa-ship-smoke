import { prisma } from "@/lib/prisma";

async function main() {
  const count = await prisma.project.count();
  if (count > 0) {
    console.log("Seed skipped: projects already exist.");
    return;
  }

  await prisma.project.createMany({
    data: [
      {
        name: "Bole Office Tower Lift Install",
        clientName: "Abay Development PLC",
        location: "Addis Ababa",
        status: "survey",
      },
      {
        name: "Kazanchis Business Center",
        clientName: "Blue Nile Holdings",
        location: "Addis Ababa",
        status: "installation",
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
