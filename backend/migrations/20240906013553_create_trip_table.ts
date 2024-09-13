import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("trip", function (table) {
    table.bigIncrements("id").unsigned().primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("bike_id").unsigned().notNullable();
    table.timestamp("start_time").notNullable();
    table.timestamp("end_time").notNullable();
    table.timestamp("updated_at").notNullable();

    table.foreign("user_id").references("id").inTable("users");
    table.foreign("bike_id").references("id").inTable("bike");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("trip");
}
