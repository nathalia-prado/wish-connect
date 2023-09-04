/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('wishlist', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.boolean('private')
    table.string('image_url').defaultTo(null)
    table.integer('user_id').references('users.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('wishlist')
}
