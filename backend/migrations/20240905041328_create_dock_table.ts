import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dock", function (table) {
    table.bigIncrements("id").unsigned().primary();
    table.bigInteger("station_id").unsigned().notNullable();
    table.bigInteger("bike_id").unsigned().notNullable();
    table.enu("status", ["Operational", "Faulty", "InService"]).notNullable();
    table.foreign("station_id").references("id").inTable("station");
    table.foreign("bike_id").references("id").inTable("station");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dock");
}
