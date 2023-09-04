/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('friends', (table) => {
    table.integer('user_id').references('users.id')
    table.integer('friend_id').references('users.id')
    table.unique(['user_id', 'friend_id']) // Prevents duplicate entries
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('friends')
}
