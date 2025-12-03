import { Router } from "express";
import auth from "./auth";
import { residents, houses, visitors } from "../../modules";

const v1 = Router();

v1.use("/visitors", visitors);
v1.use("/auth", auth);
v1.use("/residents", residents);
v1.use("/houses", houses);

export default v1;
