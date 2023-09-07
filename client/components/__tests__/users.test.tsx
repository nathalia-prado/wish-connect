//@vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import nock from 'nock'
import { renderRoute } from '../../test/utils'

beforeEach(cleanup)
expect.extend(matchers)

const FAKE_DATA = [
  {
    id: 2,
    fullName: 'Jane Doe',
    username: 'janedoe',
    friends: [1, 3],
    isFriend: 1
  },
  {
    id: 3,
    fullName: 'Bob Smith',
    username: 'bobsmith',
    friends: [1, 2],
    isFriend: 1
  }
]

describe('/users', () => {
  nock('http://localhost')
    .get('/api/v1/users')
    .reply(200, FAKE_DATA).persist()

  it('Should render all users', async () => {
    renderRoute('/users')
    const users = [
      await screen.findByText(/Bob Smith/),
      await screen.findByText(/Jane Doe/)
    ]

    users.forEach(user => expect(user).toBeVisible())
  })

  it('Should filter users based on the search parameter', async () => {
    renderRoute('/users?q=jane')
    const users = [
      await screen.queryByText(/Bob Smith/),
      await screen.findByText(/Jane Doe/)
    ]
    expect(users[0]).toBeNull()
    expect(users[1]).toBeVisible()
  })

})