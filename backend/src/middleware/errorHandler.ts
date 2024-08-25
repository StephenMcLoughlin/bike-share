import { Request, Response, NextFunction } from "express";
import logger from "../modules/logger/logger";
import CustomError from "../errors/customError";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  logger.error("[errorHandler] - ", new CustomError(message, statusCode));

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
