import { Request, Response } from "express";
import EntityNotFoundError from "../../../errors/EntityNotFoundError";
import * as visitorService from "./visitor.services";
import AuthenticationError from "../../../errors/AuthenticationError";

export const listVisitors = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getVisitor = async (req: Request, res: Response) => {
  // throw new EntityNotFoundError({
  //   message: "Entity not Found",
  //   statusCode: 404,
  //   code: "ERR_NF",
  // });
  res.status(200).json({ id: 1, name: "visitor1" });
};

export const inviteVisitor = async (req: Request, res: Response) => {
  const { body } = req.validated;

  const userId = req.auth?.payload.sub as string;

  if (!userId) {
    throw new AuthenticationError({
      message: "Unauthorized",
      statusCode: 403,
      code: "ERR_AUTH",
    });
  }

  // Fetch the resident profile using userId
  const resident = await visitorService.getResidentByUserId(userId);
  if (!resident) {
    throw new EntityNotFoundError({
      message: "Resident profile not found",
      statusCode: 404,
      code: "ERR_NF",
    });
  }

  const visitor = await visitorService.createVisitor(resident.id, body);
  res.status(201).json(visitor);
};
