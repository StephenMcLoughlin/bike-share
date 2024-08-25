import { Request, Response, NextFunction } from "express";
import logger from "../modules/logger/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} - ${decodeURI(req.url)} ${res.statusCode} ${
        res.statusMessage
      } - ${duration} ms`
    );
  });
  next();
};

export default requestLogger;
