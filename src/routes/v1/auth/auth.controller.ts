import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await authService.createUser(req.body);

  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password,
  );

  res.status(200).json(result);
};
