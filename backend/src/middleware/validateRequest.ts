import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

type Source = "body" | "query" | "params";

export const validateRequest = (schema: ZodSchema, source: Source = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      schema.safeParse(req[source]);

      next();
    } catch (err) {
      console.log(err);
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
