import * as db from '../db.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../../connection.ts'
import { NewWishlist } from '../../../../models/newWishlist.ts'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('addWishlist', () => {
  it('tests adding a single wishlist', async () => {
    const newWishlist: NewWishlist = {
      user_id: 1,
      name: 'Dog toys',
      description: 'I want to some toys for my dog',
      private: false,
    }
    const data = await db.addWishlist(newWishlist)
    expect(data).toBeDefined()
    expect(data.user_id).toBe(1)
    expect(data.name).toBe('Dog toys')
    expect(data.description).toEqual('I want to some toys for my dog')
    expect(data.private).toBeFalsy()
  })
})

afterAll(async () => {
  await connection.destroy()
})

// Expect data to have legnth of one
// const allJars = await db.getAllJars()
//     expect(allJars).toHaveLength(3)
//     expect(allJars[1].id).toBe(2)
