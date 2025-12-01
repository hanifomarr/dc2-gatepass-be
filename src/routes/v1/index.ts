import { Router } from "express";
import visitors from "./visitors";
import auth from "./auth";
import houses from "../../modules/houses";

const v1 = Router();

v1.use("/visitors", visitors);
v1.use("/auth", auth);
v1.use("/houses", houses);

export default v1;
