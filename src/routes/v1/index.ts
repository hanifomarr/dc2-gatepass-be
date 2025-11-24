import { Router } from "express";
import visitors from "./visitors";

const v1 = Router();

v1.use("/visitors", visitors);

export default v1;
