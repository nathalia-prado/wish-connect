import { test } from 'vitest'
import assert from 'assert'
import request from 'supertest'
import server from '../../server'

test('GET /api/v1/wishlists/:auth0_id - should return 200 with the wishlists', async () => {
  const mockData = [
    {
      id: 1,
      wishlist_id: 1,
      name: 'Birthday Wishlist',
      description: 'My birthday wishes',
      private: 0,
    },
  ]
  const mockDbFunc = async () => mockData

  const res = await request(server)
    .get('/api/v1/wishlists/auth0|123456')
    .send({ dbFunc: mockDbFunc })

  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.body, mockData)
})

test('GET /api/v1/wishlists/:auth0_id - should return 500 if there is an internal server error', async () => {
  const mockDbFunc = async () => {
    throw new Error('Internal server error')
  }

  const res = await request(server)
    .get('/api/v1/wishlists/auth0|123456')
    .send({ dbFunc: mockDbFunc })

  assert.strictEqual(res.statusCode, 500)
  assert.deepStrictEqual(res.body, { message: 'Internal server error' })
})
