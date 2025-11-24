import { Request, Response } from "express";
import EntityNotFoundError from "../../../errors/EntityNotFoundError";

export const listVisitors = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getVisitor = async (req: Request, res: Response) => {
  throw new EntityNotFoundError({
    message: "Entity not Found",
    statusCode: 404,
    code: "ERR_NF",
  });
  res.status(200).json({ id: 1, name: "visitor1" });
};
