//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
import { waitFor } from '@testing-library/react'
import { renderRoute } from './setup.tsx'

describe('</>', () => {
  it('shows loading text while retrieving data', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists?userId=2')
      .reply(200, [
        {
          description:
            'I have been good this year and these are the things I want for Christmas!',
          id: 2,
          image_url: '',
          name: 'Christmas Wishlist',
          private: true,
          user_id: 2,
        },
      ])

    const screen = renderRoute('/wishlists')

    await waitFor(() => {
      expect(screen.queryByText('Loading your wishlist')).toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)
  })
  it('renders an array of wishlists for a given user', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists?userId=2')
      .reply(200, [
        {
          description:
            'I have been good this year and these are the things I want for Christmas!',
          id: 2,
          image_url: '',
          name: 'Christmas Wishlist',
          private: true,
          user_id: 2,
        },
      ])

    const screen = renderRoute('/wishlists')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading your wishlist')
      ).not.toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'My Wishlists'
    )
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      'Christmas Wishlist'
    )

    expect(scope.isDone()).toBe(true)
  })
  it('shows an error when server fails', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists?userId=2')
      .reply(500)

    const screen = renderRoute('/wishlists')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading your wishlist')
      ).not.toBeInTheDocument()
    })

    expect(
      screen.getByText('There was an error retrieving your wishlists')
    ).toBeVisible()

    expect(scope.isDone()).toBe(true)
  })
  it('what renders when passed empty array', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists?userId=2')
      .reply(200, [])

    const screen = renderRoute('/wishlists')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading your wishlist')
      ).not.toBeInTheDocument()
    })

    expect(screen.getByText('Please add a wishlist')).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
