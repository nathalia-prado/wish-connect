/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Inserts seed entries
  await knex('users').insert([
    {id: 1, auth0_id: 'auth0|123456', username: 'johndoe', full_name: 'John Doe' },
    {id: 2,  auth0_id: 'auth0|789012', username: 'janedoe', full_name: 'Jane Doe' },
    {id: 3,  auth0_id: 'auth0|345678', username: 'bobsmith', full_name: 'Bob Smith' },
    {id: 4,  auth0_id: 'auth0|345678', username: 'bobsmith', full_name: 'Bob Smith' },
  ])
}
