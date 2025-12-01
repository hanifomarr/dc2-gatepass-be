import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import AuthenticationError from "../errors/AuthenticationError";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError({
      message: "Authorization header is missing or invalid",
      statusCode: 401,
      code: "ERR_AUTH",
    });
  }
  // take token from header
  const token = authHeader.split(" ")[1];
  // verify token
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    throw new AuthenticationError({
      message: "Unauthorized",
      statusCode: 403,
      code: "ERR_AUTH",
    });
  }

  // attach decode token to req.auth
  req.auth = { payload: decodedToken as JwtPayload, token };
  // call next()
  next();
};
