import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../server.ts'
import * as db from '../../db/functions/db-wishlist-by-id.ts'

vi.mock('../../db/functions/db-wishlist-by-id.ts')

describe('/wishlists', () => {
  it('returns an array of wishlists', async () => {
    vi.mocked(db.getMyWishlists).mockImplementation(async () => {
      return [
        {
          description:
            'I have been good this year and these are the things I want for Christmas!',
          id: 2,
          image_url: null,
          name: 'Christmas Wishlist',
          private: 1,
          user_id: 2,
        },
      ]
    })

    const response = await request(server).get('/myWishList/wishlists')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toContainEqual({
      description:
        'I have been good this year and these are the things I want for Christmas!',
      id: 2,
      image_url: null,
      name: 'Christmas Wishlist',
      private: 1,
      user_id: 2,
    })
    expect(db.getMyWishlists).toHaveBeenCalledOnce()
  })
  it('Deals with an empty array', async () => {
    vi.mocked(db.getMyWishlists).mockImplementation(async () => {
      return []
    })
    const response = await request(server).get('/myWishList/wishlists')
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchInlineSnapshot('[]')
    expect(response.body).toHaveLength(0)
  })
})

describe.skip('/:wishlistId')

// [
//   {
//     "id": 3,
//     "image_url": null,
//     "item": "Apple Watch Series 6",
//     "name": "Christmas Wishlist",
//     "price": 399,
//     "priority": "High",
//     "purchased": 0,
//     "wishlistId": 2,
//     "wishlist_id": 2,
//   },
// ]
