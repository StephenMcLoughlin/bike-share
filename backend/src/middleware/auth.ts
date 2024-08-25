import { Request, Response, NextFunction } from "express";
import logger from "../modules/logger/logger";
import CustomError from "../errors/customError";
import { verifyAccessToken } from "../utils/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    const error = new CustomError("Unauthorized", 401);
    logger.error("[auth] - ", error);
    throw error;
  }

  await verifyAccessToken(token);

  next();
};
