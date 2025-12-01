import { prisma } from "../../lib/prisma";
import { House } from "../../generated/prisma/client";

export class HousesService {
  async create(house: House) {
    const houseCreated = await prisma.house.create({
      data: house,
    });
    return houseCreated;
  }

  async list() {
    const housesList = await prisma.house.findMany();
    return housesList;
  }

  async get(id: string) {
    const houseDetails = await prisma.house.findUnique({
      where: {
        id,
      },
    });
    return houseDetails;
  }

  async update(id: string, house: House) {
    const houseUpdated = await prisma.house.update({
      where: {
        id,
      },
      data: house,
    });
    return houseUpdated;
  }

  async delete(id: string) {
    const houseDeleted = await prisma.house.delete({
      where: {
        id,
      },
    });
    return houseDeleted;
  }
}
