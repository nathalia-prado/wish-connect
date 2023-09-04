/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries in reverse order
  await knex('item').del()
  await knex('wishlist').del()
  await knex('friends').del()
  await knex('users').del()
}
