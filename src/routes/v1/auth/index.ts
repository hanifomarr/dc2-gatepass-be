import { Router } from "express";
import * as authController from "./auth.controller";

const auth = Router();

auth.post("/register", authController.register);
auth.post("/login", authController.login);

export default auth;
