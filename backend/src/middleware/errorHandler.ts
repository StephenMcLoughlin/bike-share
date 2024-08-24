import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
