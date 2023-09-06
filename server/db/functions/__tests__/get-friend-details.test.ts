import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../../server.ts'
import * as db from '../db.ts'

vi.mock('../db.ts')

describe('GET /api/v1/user-details', () => {
  it('response with user fullname', async () => {
    // Arrange
    vi.mocked(db.getFriendDetails).mockImplementation(
      async (friendId: string) => {
        return {
          fullName: 'John Doe',
          friendId,
        }
      }
    )

    // Act
    const res = await request(server).get('/api/v1/user-details/1')

    // Assert
    expect(res.statusCode).toBe(200)
    // expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toMatchInlineSnapshot(`
      {
        "friendId": "1",
        "fullName": "John Doe",
      }
    `)
    expect(db.getFriendDetails).toHaveBeenCalledWith('1')
  })

  it('response with user auth0 token', async () => {
    // Arrange
    vi.mocked(db.getAuthId).mockImplementation(async (userId: string) => {
      return {
        auth0_id: 'auth0token',
        userId,
      }
    })

    // Act
    const res = await request(server).get('/api/v1/wishlists/friends/1')

    // Assert
    expect(res.statusCode).toBe(200)
    // expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toMatchInlineSnapshot('""')
    expect(db.getFriendDetails).toHaveBeenCalledWith('1')
  })
})
