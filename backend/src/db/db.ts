import knex, { Knex } from "knex";
import knexConfig from "../config/knex";
import {
  StringTransformations,
  convertArrayKeys,
  convertObjectKeys,
} from "../utils/string";
import logger from "../modules/logger/logger";

// todo: clean up methods
class Database {
  private static instance: Database | null;
  private db: Knex;

  private constructor() {
    this.db = knex(knexConfig.development);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async query<T>(queryBuilder: Knex.QueryBuilder): Promise<T> {
    try {
      return await queryBuilder;
    } catch (error) {
      logger.error("[query] - ", error);
      throw error;
    }
  }

  public async selectAll(table: string): Promise<any[]> {
    return this.query(this.db(table).select("*"));
  }

  public async select<T>(table: string, columns: string[]): Promise<T[]> {
    return this.query(this.db(table).select(columns));
  }

  public async selectWhere<T>(
    table: string,
    columns: string[],
    where: Record<string, unknown>
  ): Promise<T> {
    const result = await this.query<T>(
      this.db(table).select(columns).where(where).first()
    );

    return result
      ? convertObjectKeys(result, StringTransformations.SNAKE_TO_CAMEL)
      : result;
  }

  public async selectAllWhere<T extends Record<string, unknown>>(
    table: string,
    columns: string[],
    where: Record<string, unknown>
  ): Promise<T[]> {
    const result = await this.query<T[]>(
      this.db(table).select(columns).where(where)
    );

    return result.length
      ? convertArrayKeys(result, StringTransformations.SNAKE_TO_CAMEL)
      : result;
  }

  public async insert<T>(table: string, data: T): Promise<T[]> {
    return this.query(this.db(table).insert(data).returning("*"));
  }

  public static async close(): Promise<void> {
    if (Database.instance) {
      await Database.instance.db.destroy();
      Database.instance = null;
    }
  }
}

export { Database };
