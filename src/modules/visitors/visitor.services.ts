import { Visitor } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export class VisitorService {
  async create(data: Visitor) {
    // verify resident
    const resident = await prisma.resident.findUnique({
      where: {
        id: data.residentId,
      },
    });
    if (!resident) {
      throw new Error("Resident not found");
    }

    return prisma.visitor.create({
      data: {
        name: data.name,
        phone: data.phone,
        type: data.type,
        purpose: data.purpose,
        address: data.address,
        vehicleNumber: data.vehicleNumber,
        residentId: resident.id,
      },
    });
  }

  // View visitor
  async get(id: string) {
    return prisma.visitor.findUnique({
      where: {
        id,
      },
    });
  }

  // List visitors
  async list() {
    return prisma.visitor.findMany({
      include: {
        resident: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Check-in visitor
  async checkIn(id: string) {
    return prisma.visitor.update({
      where: {
        id,
      },
      data: {
        status: "CHECKED_IN",
      },
    });
  }

  // Check-out visitor
  async checkOut(id: string) {
    return prisma.visitor.update({
      where: {
        id,
      },
      data: {
        status: "CHECKED_OUT",
      },
    });
  }
}
