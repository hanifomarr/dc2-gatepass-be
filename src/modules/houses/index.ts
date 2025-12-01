import { Router } from "express";
import { HousesController } from "./houses.controller";

const houses = Router();
const housesController = new HousesController();

houses.get("/", housesController.listHouses);
houses.post("/", housesController.createHouse);
houses.get("/:id", housesController.getHouse);
houses.put("/:id", housesController.updateHouse);
houses.delete("/:id", housesController.deleteHouse);

export default houses;
