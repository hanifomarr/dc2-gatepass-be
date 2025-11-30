import { Visitor } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

export const getResidentByUserId = async (userId: string) => {
  return prisma.resident.findUnique({
    where: {
      userId,
    },
  });
};

export const createVisitor = async (residentId: string, visitor: Visitor) => {
  // create visitor with prisma
  return prisma.visitor.create({
    data: {
      ...visitor,
      residentId,
    },
  });
};
