import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("bike", function (table) {
    table.bigIncrements("id").unsigned().primary();
    table.enu("status", ["Operational", "Faulty", "InService"]).notNullable();
    table.boolean("is_ebike").notNullable();
    table.dateTime("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("bike");
}
