import { DatabaseError } from "pg";
import { Database } from "../../db/db";
import CustomDatabaseError from "../../errors/customDatabaseError";
import { POSTGRESS_CONSTANTS } from "../../constants/postgress";

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
      console.error(error);
      throw new CustomDatabaseError("Something went wrong", 500);
    }
  }

  async getUserById(userId: string) {
    try {
      return await this.db.select<TUser>(TABLE_NAME, []);
    } catch (error) {
      console.error(error);
      throw new CustomDatabaseError("Something went wrong", 500);
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
      console.error(error);
      throw new CustomDatabaseError("Something went wrong", 500);
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
      if (
        error instanceof DatabaseError &&
        error.code === POSTGRESS_CONSTANTS.DUPLICATE_ENTRY
      ) {
        throw new CustomDatabaseError("Email already exists", 400);
      }
      throw new CustomDatabaseError("Something went wrong", 500);
    }
  }
}

export default UserService;
