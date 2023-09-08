import { describe, expect, it, vi } from 'vitest'
import connection from '../../connection.ts'
import app from '../../../server.ts'
import './db-test-setup.ts'
import request from 'supertest'
import * as dbMethods from '../db.ts'

describe('GET /api/v1/users', () => {
  it('Should return an array of all users', async () => {
    const res = await request(app).get('/api/v1/users')
      .expect('Content-Type', /json/).expect(200)
      .then(res => res.body)

    expect(res.length).toBe(2)
  })

  it('Should show a boolean value indicating if the user is friended', async () => {
    const res = await request(app).get('/api/v1/users')
      .expect('Content-Type', /json/).expect(200)
      .then(res => res.body)

    expect(res[0].isFriend).toBe(1)
    expect(res[1].isFriend).toBe(1)
  })

  it('Should display the friend IDs of the user', async () => {
    const res = await request(app).get('/api/v1/users')
      .expect('Content-Type', /json/).expect(200)
      .then(res => res.body)

    expect(res[0].friends).toStrictEqual([1, 3])
    expect(res[1].friends).toStrictEqual([1, 2])
  })

  it('Should return a 500 if an error occurs', async () => {
    vi.spyOn(dbMethods, 'getAllUsers')
      .mockImplementationOnce(() => Promise.reject('OMG IT BROKE'))
    await request(app).get('/api/v1/users').expect(500)
  })

})

describe('POST /api/v1/users/friend/:id', () => {
  it('Should add a friend with the specified ID', async () => {
    await connection('users').insert({
      id: 4,
      auth0_id: 'auth0|0001',
      username: 'testman',
      full_name: 'Test Man',
    })

    await request(app).post('/api/v1/users/friend/4').expect(200)
    const res = await connection('friends').where({friend_id: 4})
      .then(res => res?.[0])

    expect(res.user_id).toBe(1)
    expect(res.friend_id).toBe(4)
  })

  it('Should return an error if the friend ID is invalid', async () => {
    await request(app).post('/api/v1/users/friend/99').expect(400)
  })

  it('Should return an error if the friend is already added', async () => {
    await request(app).post('/api/v1/users/friend/2').expect(400)
  })
})

describe('DELETE /api/v1/users/friend/:id', () => {
  it('Should remove a friend with the specified ID', async () => {
    await request(app).delete('/api/v1/users/friend/2').expect(200)
    const res = await connection('friends').where({friend_id: 2, user_id: 1})
    expect(res.length).toBe(0)
  })

  it('Should return an error if the friend ID is invalid', async () => {
    await request(app).delete('/api/v1/users/friend/abcde').expect(400)
  })
})
