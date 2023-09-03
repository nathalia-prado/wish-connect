/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Inserts seed entries
  await knex('wishlist').insert([
    {
      id: 1,
      name: 'Birthday Wishlist',
      description: 'My birthday is coming up and these are the things I want!',
      private: false,
      user_id: 1,
    },
    {
      id: 2,
      name: 'Christmas Wishlist',
      description:
        'I have been good this year and these are the things I want for Christmas!',
      private: true,
      user_id: 2,
    },
    {
      id: 3,
      name: 'Wedding Registry',
      description:
        'We are getting married and these are the things we need for our new home!',
      private: false,
      user_id: 3,
    },
  ])
}
