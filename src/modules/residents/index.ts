import { Router } from "express";
import { ResidentsController } from "./resident.controller";

const residentsController = new ResidentsController();
const residents = Router();

residents.post("/", residentsController.createResident);
residents.get("/", residentsController.listResident);
residents.get("/:id", residentsController.getResident);
residents.put("/:id", residentsController.updateResident);
residents.delete("/:id", residentsController.deleteResident);

export default residents;
