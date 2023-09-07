import { test } from 'vitest'
import assert from 'assert'
import request from 'supertest'
import server from '../../server'
import { beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../../db/connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  connection.destroy()
})

// Updated mock data to match what the server is expected to return.
const mockData = [
  {
    auth0_id: 'auth0|123456',
    description:
      'I have been good this year and these are the things I want for Christmas!',
    friend_id: 2,
    id: 1,
    name: 'Christmas Wishlist',
    private: 1,
    user_id: 1,
    wishlist_id: 2,
    wishlist_user_id: 2,
  },
  {
    auth0_id: 'auth0|123456',
    description:
      'We are getting married and these are the things we need for our new home!',
    friend_id: 3,
    id: 1,
    name: 'Wedding Registry',
    private: 0,
    user_id: 1,
    wishlist_id: 3,
    wishlist_user_id: 3,
  },
]

test('GET /api/v1/wishlists/:auth0_id - should return 200 with the wishlists', async () => {
  const res = await request(server).get('/api/v1/wishlists/auth0|123456')

  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.body, mockData)
})
// =========================================================
// Simulated server error.
// Use the following code as a template/ inspiration:
// ---------------------------------------------------------

// https://github.com/mako-2023/code-from-class/blob/main/week6/mon-pm/client/components/__tests__/Sharks.test.tsx

// //@vitest-environment jsdom
// import { describe, it, expect } from 'vitest'
// import {
//   screen,
//   within,
//   waitFor,
//   waitForElementToBeRemoved,
// } from '@testing-library/react'
// import nock from 'nock'
// import { renderApp } from '../../test/setup.tsx'

// describe('<Sharks>', () => {
//   it('should render a loading indicator', async () => {
//     const scope = nock('http://localhost')
//       .get('/api/v1/sharks')
//       .reply(200, [
//         { id: 1, name: 'Cool Shark', colour: 'Gray' },
//         { id: 2, name: 'Parent Shark', colour: 'Yellow' },
//       ])
//     renderApp('/sharks')

//     await waitFor(() => screen.getByText(/loading/i))
//     expect(scope.isDone()).toBe(true)
//   })

//   it('should render some sharks', async () => {
//     const scope = nock('http://localhost')
//       .get('/api/v1/sharks')
//       .reply(200, [
//         { id: 1, name: 'Cool Shark', colour: 'Gray' },
//         { id: 2, name: 'Parent Shark', colour: 'Yellow' },
//       ])

//     renderApp('/sharks')

//     await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
//     // expect(screen.getByRole('list', { name: /sharks/i })).toBeInTheDocument()
//     const list = screen.getByRole('list', { name: /sharks/i })
//     const listItems = within(list)
//       .getAllByRole('listitem')
//       .map((li) => li.textContent)

//     // const listItems = screen.getAllByRole('listitem')

//     expect(listItems).toMatchInlineSnapshot(`
//       [
//         "Cool Shark is Gray",
//         "Parent Shark is Yellow",
//       ]
//     `)
//     expect(scope.isDone()).toBe(true)
//   })

//   it('should render an error message when things go wrong', async () => {
//     const scope = nock('http://localhost').get('/api/v1/sharks').reply(500)
//     // const scope = nock('http://localhost').get('/api/v1/sharks').replyWithError('whatever happened')

//     renderApp('/sharks')

//     await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

//     const error = screen.getByText(/wrong/i)
//     expect(error).toBeInTheDocument()
//     expect(scope.isDone()).toBe(true)
//   })
// })
