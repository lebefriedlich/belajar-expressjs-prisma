const prisma = require("../utils/PrismaClient");

async function main() {
  await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: "ADMIN",
      },
      {
        id: 2,
        name: "USER",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@example.com",
      password: "admin123",
      role_id: 1
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
