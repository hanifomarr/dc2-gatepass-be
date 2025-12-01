import { prisma } from "./lib/prisma";
import * as bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  // 1. Create Admin User
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

  // 2. Create Guard User and Profile
  const userGuard = await prisma.user.upsert({
    where: { email: "guard@example.com" },
    update: {},
    create: {
      email: "guard@example.com",
      password: hashedPassword,
      name: "Guard User",
      role: "GUARD",
      guard: {
        create: {
          shift: "Morning",
          employeeId: "G-001",
        },
      },
    },
    include: {
      guard: true,
    },
  });

  // 3. Create Resident User and Profile
  const userResident = await prisma.user.upsert({
    where: { email: "resident@example.com" },
    update: {},
    create: {
      email: "resident@example.com",
      password: hashedPassword,
      name: "Resident User",
      role: "RESIDENT",
      Resident: {
        create: {
          name: "Resident User",
          unitNumber: "A-01-01",
          phone: "+60123456789",
        },
      },
    },
    include: {
      Resident: true,
    },
  });

  const resident = userResident.Resident[0]; // Assuming one resident profile per user for now

  if (resident) {
    // 4. Create Vehicles
    await prisma.vehicle.createMany({
      data: [
        {
          residentId: resident.id,
          licensePlate: "WAA 1234",
          type: "CAR",
        },
        {
          residentId: resident.id,
          licensePlate: "WBB 5678",
          type: "MOTORCYCLE",
        },
      ],
      skipDuplicates: true, // Avoid errors if running seed multiple times (though IDs are UUIDs, so this is just safe practice if we used static IDs)
    });

    // 5. Create Visitors
    const visitor1 = await prisma.visitor.create({
      data: {
        residentId: resident.id,
        name: "John Doe",
        phone: "+60198765432",
        type: "GUEST",
        purpose: "Visit friend",
        vehicleNumber: "WCC 9012",
      },
    });

    const visitor2 = await prisma.visitor.create({
      data: {
        residentId: resident.id,
        name: "Jane Smith",
        phone: "+601122334455",
        type: "PARENT",
        purpose: "Family visit",
      },
    });

    // 6. Create Pass
    const pass = await prisma.pass.create({
      data: {
        visitorId: visitor1.id,
        residentId: resident.id,
        code: "QR-CODE-DATA-123", // In real app, this would be a JWT or unique string
        validFrom: new Date(),
        validTo: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Valid for 24 hours
        status: "ACTIVE",
      },
    });

    // 7. Create EntryLog (Simulate Check-in)
    if (userGuard.guard) {
      await prisma.entryLog.create({
        data: {
          passId: pass.id,
          guardId: userGuard.id, // EntryLog links to User (Guard), not Guard profile directly based on schema? Let's check schema.
          // Schema: guard User @relation(fields: [guardId], references: [id]) -> Yes, User ID.
          action: "CHECK_IN",
        },
      });
    }
  }

  console.log("Seeding completed.");
  console.log({
    admin: userAdmin.email,
    guard: userGuard.email,
    resident: userResident.email,
  });
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
