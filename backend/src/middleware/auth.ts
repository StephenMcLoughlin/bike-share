import { Request, Response, NextFunction } from "express";
import logger from "../modules/logger/logger";
import { verifyAccessToken } from "../utils/jwt";
import { IUser } from "../modules/user/userService";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.error(
      "[auth] - Unauthorized: Missing or malformed Authorization header"
    );
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const [, token] = authHeader.split(" ");
  try {
    await verifyAccessToken(token);
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};
