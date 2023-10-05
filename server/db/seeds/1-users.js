/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'auth0|111111',
      username: 'johndoe',
      full_name: 'John Doe',
    },
    {
      id: 2,
      auth0_id: 'auth0|222222',
      username: 'janedoe',
      full_name: 'Jane Doe',
    },
    {
      id: 3,
      auth0_id: 'auth0|333333',
      username: 'bobsmith',
      full_name: 'Bob Smith',
    },
    {
      id: 4,
      auth0_id: 'auth0|444444',
      username: 'rossgeller',
      full_name: 'Ross Geller',
    },
    {
      id: 5,
      auth0_id: 'auth0|555555',
      username: 'monicageller',
      full_name: 'Monica Geller',
    },
    {
      id: 6,
      auth0_id: 'auth0|666666',
      username: 'joeytribbiani',
      full_name: 'Joey Tribbiani',
    },
    {
      id: 7,
      auth0_id: 'auth0|777777',
      username: 'chandlerbing',
      full_name: 'Chandler Bing',
    },
    {
      id: 8,
      auth0_id: 'auth0|888888',
      username: 'phoebebuffay',
      full_name: 'Phoebe Buffay',
    },
    {
      id: 9,
      auth0_id: 'auth0|999999',
      username: 'rachelgreen',
      full_name: 'Rachel Green',
    },
    {
      id: 10,
      auth0_id: 'auth0|101010',
      username: 'steverogers',
      full_name: 'Steve Rogers',
    },
    {
      id: 11,
      auth0_id: 'auth0|121212',
      username: 'thorodinson',
      full_name: 'Thor Odinson',
    },
    {
      id: 12,
      auth0_id: 'auth0|131313',
      username: 'brucebanner',
      full_name: 'Bruce Banner',
    },
    {
      id: 13,
      auth0_id: 'auth0|141414',
      username: 'natasharomanoff',
      full_name: 'Natasha Romanoff',
    },
    {
      id: 14,
      auth0_id: 'auth0|151515',
      username: 'clintbarton',
      full_name: 'Clint Barton',
    },
    {
      id: 15,
      auth0_id: 'auth0|161616',
      username: 'tonystark',
      full_name: 'Tony Stark',
    },
    {
      id: 16,
      auth0_id: 'auth0|171717',
      username: 'jeffwinger',
      full_name: 'Jeff Winger',
    },
    {
      id: 17,
      auth0_id: 'auth0|181818',
      username: 'brittaperry',
      full_name: 'Britta Perry',
    },
    {
      id: 18,
      auth0_id: 'auth0|191919',
      username: 'abednadir',
      full_name: 'Abed Nadir',
    },
    {
      id: 19,
      auth0_id: 'auth0|202020',
      username: 'shirleybennett',
      full_name: 'Shirley Bennett',
    },
    {
      id: 20,
      auth0_id: 'auth0|212121',
      username: 'troybarnes',
      full_name: 'Troy Barnes',
    },
    {
      id: 21,
      auth0_id: 'auth0|202202',
      username: 'annienedermeyer',
      full_name: 'Annie Edison',
    },
  ])
}
