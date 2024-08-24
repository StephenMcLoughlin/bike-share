import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.bigIncrements("id").unsigned().primary();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 50).notNullable();
    table.string("email", 254).notNullable().unique();
    table.string("password", 72).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
