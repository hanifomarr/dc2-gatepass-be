import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import v1 from "./routes/v1";
import errorHandler from "./middleware/error-handler";

export const createServer = () => {
  const app = express();

  // middleware
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  // routes
  app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true, enviroment: config.env });
  });
  app.use("/v1", v1);

  // error handler
  app.use(errorHandler);

  return app;
};
