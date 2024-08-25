import { DatabaseError } from "pg";
import { Database } from "../../db/db";
import { POSTGRESS_CONSTANTS } from "../../constants/postgress";
import CustomError from "../../errors/customError";
import logger from "../logger/logger";

export interface User {
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

  async getUserById(id: number) {
    try {
      return await this.db.selectWhere<TUser>(
        TABLE_NAME,
        ["id", "first_name", "last_name", "email"],
        { id }
      );
    } catch (error) {
      logger.error("[getUserById]", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.db.selectWhere<TUser>(
        TABLE_NAME,
        ["id", "first_name", "last_name", "email", "password"],
        { email }
      );
    } catch (error) {
      logger.error("[getUserByEmail] - ", error);
      throw new CustomError("Something went wrong", 500);
    }
  }

  async createUser(user: User) {
    const { firstName, lastName, email, password } = user;

    try {
      return await this.db.insert<TUser>(TABLE_NAME, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
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
