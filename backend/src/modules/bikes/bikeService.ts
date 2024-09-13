import { Database } from "../../db/db";
import CustomError from "../../errors/customError";
import logger from "../logger/logger";

const TABLE_NAME = "bike";

type IBike = {
  id: number;
  status: string;
  isEbike: boolean;
};

type TBike = {
  id: number;
  status: string;
  is_ebike: boolean;
};

class BikeService {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getBikes() {
    try {
      return await this.db.select<IBike>(TABLE_NAME, [
        "id",
        "status",
        "is_ebike",
      ]);
    } catch (error) {
      logger.error("[getBikes]", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async getBikeById(id: number) {
    try {
      return await this.db.selectWhere<IBike>(
        TABLE_NAME,
        ["id", "status", "is_ebike"],
        {
          id,
        }
      );
    } catch (error) {
      logger.error("[getBikeById]", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async createBikes(bikes: IBike[]) {
    try {
      return this.db.insertMany<IBike, TBike>(TABLE_NAME, bikes);
    } catch (error) {
      logger.error("[getBikeById]", error);
      throw new CustomError("Something went wrong", 500);
    }
  }
}

export default BikeService;
