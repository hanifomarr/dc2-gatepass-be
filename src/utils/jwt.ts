import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (userId: string) => {
  const payload = {
    sub: userId,
    iat: Date.now(),
    exp: Date.now() + 1000 * 60 * 60,
  };

  return jwt.sign(payload, config.jwtSecret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
