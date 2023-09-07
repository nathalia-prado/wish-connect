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
