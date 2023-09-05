import * as db from '../db-wishlist-by-id.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../../connection.ts'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getMyWishlists', () => {
  it('returns an array of wishlists', async () => {
    const fakeAuthId = 'auth0|789012'
    const myWishlists = await db.getMyWishlists(fakeAuthId)
    const name = myWishlists[0].name

    expect(Array.isArray(myWishlists)).toBe(true)
    expect(myWishlists).toHaveLength(1)
    // expect(name).toEqual('Birthday Wishlist')
    expect(name).toMatchInlineSnapshot('"Christmas Wishlist"')
  })
  it('returns empty array if fake authId provided', async () => {
    const myWishlists = await db.getMyWishlists('123')

    expect(myWishlists).toHaveLength(0)
    expect(Array.isArray(myWishlists)).toBe(true)
  })
})

describe('getWishListById', () => {
  it('returns an array of a single wishlist', async () => {
    const id = 2
    const fakeAuthId = 'auth0|789012'
    const wishlist = await db.getWishListById(id, fakeAuthId)

    expect(Array.isArray(wishlist)).toBe(true)
    expect(wishlist).toHaveLength(1)
    expect(wishlist[0].item).toEqual('Apple Watch Series 6')
  })
  it('returns empty array with bad AuthID', async () => {
    const id = 2
    const wrongAuthId = 'auth0|123456'
    const wishlist = await db.getWishListById(id, wrongAuthId)

    expect(wishlist).toHaveLength(0)
    expect(Array.isArray(wishlist)).toBe(true)
  })
})

afterAll(async () => {
  await connection.destroy()
})
