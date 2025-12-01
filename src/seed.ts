import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  const userAdmin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  const userResident = await prisma.user.upsert({
    where: { email: "resident@example.com" },
    update: {},
    create: {
      email: "resident@example.com",
      password: hashedPassword,
      name: "Resident User",
      role: "RESIDENT",
    },
  });

  console.log({ userAdmin, userResident });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
