import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("bike", function (table) {
    table.bigIncrements("id").unsigned().primary();
    table
      .enum("status", ["Operational", "Faulty", "InService"], {
        useNative: true,
        enumName: "bike_status_enum",
      })
      .defaultTo("Operational")
      .notNullable();
    table.boolean("is_ebike").notNullable();
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("bike");
}
