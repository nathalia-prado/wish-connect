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
          image_url: '',
          name: 'Christmas Wishlist',
          private: true,
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
      image_url: '',
      name: 'Christmas Wishlist',
      private: 1,
      user_id: 2,
    })
    expect(db.getMyWishlists).toHaveBeenCalledOnce()
  })
  it('Deals with no wishlists from db', async () => {
    vi.mocked(db.getMyWishlists).mockImplementation(async () => {
      return []
    })
    const response = await request(server).get('/myWishList/wishlists')
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchInlineSnapshot('[]')
    expect(response.body).toHaveLength(0)
  })
  it('returns a 404 for in invalid route', async () => {
    const response = await request(server).get('/fake/route')
    expect(response.statusCode).toBe(404)
  })
})

describe('/:wishlistId', () => {
  it('returns a single wishlist array', async () => {
    vi.mocked(db.getWishListById).mockImplementation(async () => {
      return [
        {
          id: 3,
          image_url: 'test',
          item: 'Apple Watch Series 6',
          name: 'Christmas Wishlist',
          price: 399,
          priority: 'High',
          purchased: true,
          wishlist_id: 2,
        },
      ]
    })
    const response = await request(server).get('/myWishList/:wishlistId')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toContainEqual({
      id: 3,
      image_url: '',
      item: 'Apple Watch Series 6',
      name: 'Christmas Wishlist',
      price: 399,
      priority: 'High',
      purchased: true,
      wishlist_id: 2,
    })
  })
  it('catches an error if db fails', async () => {
    vi.mocked(db.getWishListById).mockImplementation(async () => {
      throw new Error()
    })

    const response = await request(server).get('/myWishList/:wishlistId')
    expect(response.statusCode).toBe(500)
  })
})
