/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('item', (table) => {
    table.increments('id').primary()
    table.integer('wishlist_id').references('wishlist.id')
    table.string('item')
    table.string('priority')
    table.integer('price')
    table.boolean('purchased').defaultTo(false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('item')
}
