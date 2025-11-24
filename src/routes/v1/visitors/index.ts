import { Router } from "express";
import { getVisitor, listVisitors } from "./visitor.controller";

const visitors = Router();

visitors.get("/", listVisitors);
visitors.get("/:id", getVisitor);

export default visitors;
