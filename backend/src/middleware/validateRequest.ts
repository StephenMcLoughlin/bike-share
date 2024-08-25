import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import logger from "../modules/logger/logger";

type Source = "body" | "query" | "params";

export const validateRequest = (schema: ZodSchema, source: Source = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.safeParse(req[source]);

      next();
    } catch (err) {
      logger.error("[validateRequest] - ", err);
      if (err instanceof ZodError) {
        // Send a 400 response with validation error details
        return res.status(400).json({
          success: false,
          errors: err.errors.map((error) => error.message),
        });
      }
      next(err);
    }
  };
};
