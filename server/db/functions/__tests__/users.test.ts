import { describe, it } from 'vitest'
import './db-test-setup.ts'

describe('GET /api/v1/users', () => {
  it('Should return an array of all users')
  it('Should show a boolean value indicating if the user is friended')
  it('Should return a 500 if an error occurs')
})

describe('POST /api/v1/users/friend/:id', () => {
  it('Should add a friend with the specified ID')
  it('Should return an error if the friend ID is invalid')
  it('Should return an error if the friend is already added')
})

describe('DELETE /api/v1/users/friend/:id', () => {
  it('Should remove a friend with the specified ID')
  it('Should return an error if the friend ID is invalid')
})
