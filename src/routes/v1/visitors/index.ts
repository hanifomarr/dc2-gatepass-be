import { Router } from "express";
import { getVisitor, inviteVisitor, listVisitors } from "./visitor.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import validate from "../../../middleware/validate.middleware";
import { inviteVisitorSchema } from "./visitor.schema";

const visitors = Router();

visitors.use(authMiddleware);
visitors.get("/", listVisitors);
visitors.get("/:id", getVisitor);
visitors.post("/invite", validate(inviteVisitorSchema), inviteVisitor);

export default visitors;
