//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import nock from 'nock'
import { renderRoute } from '../../test/setup.tsx'

describe('get-friend-wishlists', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlists/1')
      .reply(200, {
        item: 'AirPods Pro',
        priority: 'Medium',
        price: 249,
      })

    renderRoute('/friends/1/1')

    await waitFor(() => screen.getByText(/loading/i))
    expect(scope.isDone()).toBe(true)
  })

  it('should render a wishlist', async () => {
    const scopeWishlist = nock('http://localhost')
      .get('/api/v1/wishlists/1')
      .reply(200, [
        {
          item: 'Nintendo Switch',
          priority: 'High',
          price: 299,
        },
        {
          item: 'AirPods Pro',
          priority: 'Medium',
          price: 249,
        },
      ])

    const scopeUserDetails = nock('http://localhost')
      .get('/api/v1/user-details/1')
      .reply(200, {
        fullName: 'Test Buddy',
      })

    renderRoute('/friends/1/1')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const items = screen.getAllByRole('listitem')
    const name = screen.getByRole('heading', { level: 2 })

    expect(items[0]).toHaveTextContent('Nintendo Switch')

    expect(name.textContent).toBe('Test Buddy')

    expect(scopeWishlist.isDone()).toBe(true)
    expect(scopeUserDetails.isDone()).toBe(true)
  })

  it('should fail', async () => {
    const scope = nock('http://localhost').get('/api/v1/wishlists/1').reply(500)

    renderRoute('/friends/1/1')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const error = screen.getByText(/Error fetching friends wishlist items!/i)
    expect(error).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
