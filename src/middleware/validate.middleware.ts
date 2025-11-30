import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";

const validate =
  <T extends ZodObject<ZodRawShape>>(schema: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // validate request body,params,query with zod
    const parsed = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    req.validated = parsed;

    next();
  };

export default validate;
