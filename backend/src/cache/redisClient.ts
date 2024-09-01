import { RedisClientType, createClient } from "redis";
import logger from "../modules/logger/logger";
import CustomError from "../errors/customError";
import { GENERIC_ERROR } from "../constants/postgress";

class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on("error", (error) =>
      logger.error("[Redis Client] - ", error)
    );

    this.client
      .connect()
      .then(() => {
        this.isConnected = true;
        logger.info("[Redis Client] - connected");
      })
      .catch((error) => {
        this.isConnected = false;
        logger.error("[Redis Client] - Connection error -", error);
      });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      this.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public async get(key: string) {
    if (!this.isConnected) {
      this.logAndThrowError();
    }
    return this.client.get(key);
  }

  public async set(key: string, value: string) {
    if (!this.isConnected) {
      this.logAndThrowError();
    }
    await this.client.set(key, value);
  }

  private logAndThrowError() {
    logger.error("[Redis Client] - Redis Client is not connected");
    throw new CustomError("Something went wrong", 500);
  }
}

export default RedisClient.getInstance();
