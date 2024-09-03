import { DatabaseError } from "pg";
import { Database } from "../../db/db";
import { POSTGRESS_CONSTANTS } from "../../constants/postgress";
import CustomError from "../../errors/customError";
import logger from "../logger/logger";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface TUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const TABLE_NAME = "users";

class UserService {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getUsers() {
    try {
      return await this.db.select<TUser>(TABLE_NAME, [
        "id",
        "first_name",
        "last_name",
        "email",
      ]);
    } catch (error) {
      logger.error("[getUsers] - ", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async getUserById(id: number): Promise<IUser> {
    try {
      return await this.db.selectWhere<IUser>(
        TABLE_NAME,
        ["id", "first_name", "last_name", "email"],
        { id }
      );
    } catch (error) {
      logger.error("[getUserById]", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      return await this.db.selectWhere<IUser>(
        TABLE_NAME,
        ["id", "first_name", "last_name", "email", "password"],
        { email }
      );
    } catch (error) {
      logger.error("[getUserByEmail] - ", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async createUser(user: IUser) {
    try {
      const { password, ...createdUser } = await this.db.insert<TUser, IUser>(
        TABLE_NAME,
        {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: user.password,
        }
      );
      return createdUser;
    } catch (error) {
      logger.error("[createUser] - ", error);
      if (
        error instanceof DatabaseError &&
        error.code === POSTGRESS_CONSTANTS.DUPLICATE_ENTRY
      ) {
        throw new CustomError("Email already exists", 400);
      }
      throw new CustomError("Something went wrong", 500);
    }
  }
}

export default UserService;
