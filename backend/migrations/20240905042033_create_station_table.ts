import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("station", function (table) {
    table.bigIncrements("id").unsigned().primary();
    table.string("name", 30).notNullable();
    table.string("street", 50).notNullable();
    table.string("city", 30).notNullable();
    table.string("postal_code", 12).notNullable();
    table.decimal("latitude", 10, 8).notNullable();
    table.decimal("longitude", 11, 8).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("station");
}
