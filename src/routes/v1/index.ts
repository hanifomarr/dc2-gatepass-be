import { Router } from "express";
import visitors from "./visitors";
import auth from "./auth";

const v1 = Router();

v1.use("/visitors", visitors);
v1.use("/auth", auth);

export default v1;
