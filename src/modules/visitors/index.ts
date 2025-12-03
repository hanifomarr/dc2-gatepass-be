import { Router } from "express";
import { VisitorController } from "./visitor.controller";

const visitorController = new VisitorController();
const visitors = Router();

visitors.post("/", visitorController.createVisitor);
visitors.get("/", visitorController.listVisitors);
visitors.get("/:id", visitorController.viewVisitor);
// visitors.put("/:id", visitorController.updateVisitor);
// visitors.delete("/:id", visitorController.deleteVisitor);
visitors.post("/:id/checkin", visitorController.checkInVisitor);
visitors.post("/:id/checkout", visitorController.checkOutVisitor);

export default visitors;
