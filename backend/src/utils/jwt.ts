import jwt from "jsonwebtoken";
import logger from "../modules/logger/logger";

const JWT_SECRET = process.env.JWT_SECRET;

type AccessToken = {
  accessToken: string;
  refreshToken: string;
};

// todo: sort out typing
export const createAccessTokens = (user: any): AccessToken | undefined => {
  if (!JWT_SECRET) {
    logger.error("Missing JWT Secret");
    return;
  }

  const accessToken = jwt.sign(user, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(user, JWT_SECRET, {
    expiresIn: "30 days",
  });

  return { accessToken, refreshToken };
};
