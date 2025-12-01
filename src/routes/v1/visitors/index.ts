import { Router } from "express";
import { getVisitor, listVisitors } from "./visitor.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const visitors = Router();

visitors.use(authMiddleware);
visitors.get("/", listVisitors);
visitors.get("/:id", getVisitor);

export default visitors;
