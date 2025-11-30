import { Router } from "express";
import {
  createResident,
  deleteResident,
  getResident,
  listResident,
  updateResident,
} from "./resident.controller";

const residents = Router();

residents.post("/", createResident);
residents.get("/", listResident);
residents.get("/:id", getResident);
residents.put("/:id", updateResident);
residents.delete("/:id", deleteResident);

export default residents;
