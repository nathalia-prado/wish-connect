// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as api from '../get-friend-wishlists.ts'
import App from '../../pages/friend-wishlists.tsx'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../get-friend-wishlists.ts')

describe('Load Page', () => {
  it('Loadings status', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByText('Loading ...')).toBeVisible()
    expect(api.getFriendsDetails).toHaveBeenCalled()
  })

  it.skip('Loadings an friends wishlist', async () => {
    vi.mocked(api.getFriendsWishlists).mockImplementation(async () => {
      return {
        id: 1,
        auth0_id: 'test',
        user_id: 1,
        friend_id: 1,
        wishlist_id: 1,
        name: 'test',
        description: 'test',
        wishlist_user_id: 1,
        private: false,
      }
    })

    vi.mocked(api.getFriendsDetails).mockImplementation(async () => {
      return { fullName: 'Test Buddy' }
    })

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const message = await screen.findByText('Test Buddy')
    expect(message).toBeVisible()
    expect(message.textContent).toMatch(/Test Buddy/)
    expect(api.getFriendsDetails).toHaveBeenCalled()
  })
})
