import { Resident } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export class ResidentsService {
  async create(data: Resident) {
    const house = await prisma.house.findUnique({
      where: {
        id: data.houseId,
      },
    });

    if (!house) {
      throw new Error("House not found");
    }

    const newResident = await prisma.resident.create({
      data: {
        userId: data.userId,
        name: data.name,
        phone: data.phone,
        houseId: house.id,
      },
    });

    return newResident;
  }

  async list() {
    const residents = await prisma.resident.findMany({
      include: { house: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return residents;
  }

  async getById(id: string) {
    const resident = await prisma.resident.findUnique({
      where: {
        id,
      },
      include: { house: true },
    });

    return resident;
  }

  async update(id: string, data: Resident) {
    const residentUpdated = await prisma.resident.update({
      where: {
        id,
      },
      data,
    });
    return residentUpdated;
  }

  async delete(id: string) {
    const residentDeleted = await prisma.resident.delete({
      where: {
        id,
      },
    });
    return residentDeleted;
  }
}
