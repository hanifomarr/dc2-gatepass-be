import { Router } from "express";
import visitors from "./visitors";
import auth from "./auth";
import residents from "./residents";

const v1 = Router();

v1.use("/visitors", visitors);
v1.use("/auth", auth);
v1.use("/residents", residents);

export default v1;
