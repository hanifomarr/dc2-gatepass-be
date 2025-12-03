import { Router } from "express";
import { VisitorController } from "./visitor.controller";

const visitorController = new VisitorController();
const visitors = Router();

visitors.post("/", visitorController.createVisitor);
visitors.get("/", visitorController.listVisitors);
visitors.get("/:id", visitorController.viewVisitor);

export default visitors;
