import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../../server.ts'
import * as db from '../db.ts'

vi.mock('../db.ts')

describe('friends single wishlist', () => {
  it('response with friend wishlist', async () => {
    // Arrange
    vi.mocked(db.getWishlistItems).mockImplementation(
      async (wishlistId: string) => {
        return {
          id: 'John Doe',
          wishlist_id: 1,
          item: 'item',
          priority: 'High',
          price: 420,
          purchased: false,
          wishlistId,
        }
      }
    )

    // Act
    const res = await request(server).get('/api/v1/wishlists/1')

    // Assert
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toMatchInlineSnapshot(`
      {
        "id": "John Doe",
        "item": "item",
        "price": 420,
        "priority": "High",
        "purchased": false,
        "wishlistId": "1",
        "wishlist_id": 1,
      }
    `)
    expect(db.getWishlistItems).toHaveBeenCalledWith('1')
  })

  it('responds with an error when the database fails', async () => {
    // Arrange
    vi.spyOn(console, 'log').mockImplementation(() => {})

    vi.mocked(db.getWishlistItems).mockImplementation(async () => {
      throw new Error('Database failure')
    })

    // Act
    const res = await request(server).get('/api/v1/wishlists/1')

    // Assert
    expect(console.log).toHaveBeenCalled()
    expect(res.status).toBe(500)
  })
})
