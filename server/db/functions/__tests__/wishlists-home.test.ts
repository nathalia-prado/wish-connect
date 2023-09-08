import { expect, it, describe, vi } from 'vitest'
import request from 'supertest'
import app from '../../../server.ts'
import './db-test-setup.ts'
import { FriendWishlist } from '../../../../models/wishlist.ts'

describe('/wishlists/', () => {
  it('Should return a list of all friends wishlists', async () => {
    const res = await request(app).get('/api/v1/wishlists')
      .expect('Content-Type', /json/).expect(200)

    expect(res.body.length).toBe(1)
  })

  it('Should only return public wishlists', async () => {
    const res = await request(app).get('/api/v1/wishlists')
      .expect('Content-Type', /json/).expect(200)

    expect(res.body.find((list: FriendWishlist) => list.wishlistId === 2)).toBeUndefined()
  })

  it('Should contain the friends user information', async () => {
    const res = await request(app).get('/api/v1/wishlists')
      .expect('Content-Type', /json/).expect(200)

    expect(res.body.forEach((list: FriendWishlist) => {
      expect(list.name).toBeDefined()
      expect(list.username).toBeDefined()
    }))
  })
})

