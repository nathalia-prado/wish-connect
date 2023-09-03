/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Inserts seed entries
  await knex('item').insert([
    {
      wishlist_id: 1,
      item: 'Nintendo Switch',
      priority: 'High',
      price: 299,
      purchased: false,
    },
    {
      wishlist_id: 1,
      item: 'AirPods Pro',
      priority: 'Medium',
      price: 249,
      purchased: false,
    },
    {
      wishlist_id: 2,
      item: 'Apple Watch Series 6',
      priority: 'High',
      price: 399,
      purchased: false,
    },
  ])
}
