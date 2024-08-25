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

const verifyToken = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};

export const verifyAccessToken = async (token: string) => {
  if (!JWT_SECRET) {
    logger.error("Missing JWT Secret");
    return;
  }
  return await verifyToken(token, JWT_SECRET);
};
