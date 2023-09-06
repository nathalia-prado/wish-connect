//Make sure this test is in the apporpriate place, since you're testing a component, it should be in a new __test__ folder inside the pages folder.

//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import nock from 'nock'
import { renderRoute } from '../../test/setup.tsx'

describe('<FriendWishlist>', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlists/friends/1')
      .reply(200, [
        {
          id: 1,
          auth0_id: 'test',
          user_id: 1,
          friend_id: 2,
          wishlist_id: 2,
          name: 'test',
          description: 'test',
          wishlist_user_id: 2,
          private: 1,
        },
      ])

    const scope1 = nock('http://localhost')
      .get('/api/v1/user-details/1')
      .reply(200, {
        fullName: 'Test Buddy',
      })

    renderRoute('/friends/1')

    await waitFor(() => screen.getByText(/Loading .../i))
    // create a new expect statement that checks for the presence of the loading indicator

    expect(scope.isDone()).toBe(true)
    expect(scope1.isDone()).toBe(true)
  })

  it('should render a wishlist', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlists/friends/1')
      .reply(200, [
        {
          id: 1,
          auth0_id: 'test',
          user_id: 1,
          friend_id: 2,
          wishlist_id: 2,
          name: 'testName',
          description: 'testList',
          wishlist_user_id: 2,
          private: 1,
        },
      ])

    const scope1 = nock('http://localhost')
      .get('/api/v1/user-details/1')
      .reply(200, {
        fullName: 'Test Buddy',
      })

    renderRoute('/friends/1')

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading .../i))
    // expect(screen.getByRole('list', { name: /sharks/i })).toBeInTheDocument()
    const heading3 = screen.getByRole('heading', { level: 3 })
    const name = screen.getByRole('heading', { level: 2 })

    expect(heading3.textContent).toBe('testList')
    expect(name.textContent).toBe('Test Buddy')

    expect(scope.isDone()).toBe(true)
    expect(scope1.isDone()).toBe(true)
  })

  it('should fail', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlists/friends/1')
      .reply(500)

    renderRoute('/friends/1')

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading .../i))

    const error = screen.getByText(/Error fetching friends wishlists!/i)
    expect(error).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
