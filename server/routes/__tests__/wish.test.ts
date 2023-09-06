import { test } from 'vitest'
import assert from 'assert'
import request from 'supertest'
import server from '../../server'

const mockDataForAddItem = {
  wishlist_id: 1,
  item: 'New Laptop',
  priority: 'High',
  price: 1200,
  purchased: 0,
}

const mockDataForGetItem = {
  id: 1,
  wishlist_id: 1,
  item: 'New Laptop',
  priority: 'High',
  price: 1200,
  purchased: 0,
}

const mockDataForUpdateItem = {
  id: 1,
  wishlist_id: 1,
  item: 'Updated Laptop',
  priority: 'Medium',
  price: 1100,
  purchased: 0,
}

test('POST /api/v1/wish/:wishlistId/item - should return 200 with the added item', async () => {
  const mockDbFunc = async () => mockDataForAddItem

  const res = await request(server)
    .post('/api/v1/wish/1/item')
    .send({ ...mockDataForAddItem, dbFunc: mockDbFunc })

  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.body, mockDataForAddItem)
})

test('GET /api/v1/wish/:wishlistId/item/:itemId - should return 200 with the item', async () => {
  const mockDbFunc = async () => mockDataForGetItem

  const res = await request(server)
    .get('/api/v1/wish/1/item/1')
    .send({ dbFunc: mockDbFunc })

  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.body, mockDataForGetItem)
})

test('PUT /api/v1/wish/:wishlistId/item/:itemId - should return 200 with the updated item', async () => {
  const mockDbFunc = async () => mockDataForUpdateItem

  const res = await request(server)
    .put('/api/v1/wish/1/item/1')
    .send({ ...mockDataForUpdateItem, dbFunc: mockDbFunc })

  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(res.body, mockDataForUpdateItem)
})
