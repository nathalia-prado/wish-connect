//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
import { waitFor } from '@testing-library/react'
import { renderRoute } from './setup.tsx'

describe('<Wishlist />', () => {
  it('shows loading text while retrieving data', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists/1?userId=1')
      .reply(200, [
        {
          name: 'Birthday Wishlist',
          id: 1,
          wishlist_id: 1,
          item: 'Nintendo Switch',
          priority: 'High',
          price: 299,
          image_url: null,
          purchased: 0,
        },
        {
          name: 'Birthday Wishlist',
          id: 2,
          wishlist_id: 1,
          item: 'AirPods Pro',
          priority: 'Medium',
          price: 249,
          image_url: null,
          purchased: 0,
        },
      ])

    const screen = renderRoute('/wishlists/1')

    await waitFor(() => {
      expect(screen.queryByText('Loading your wishlist')).toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)
  })
  it('Renders wishlist array with items', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists/1?userId=1')
      .reply(200, [
        {
          name: 'Birthday Wishlist',
          id: 1,
          wishlist_id: 1,
          item: 'Nintendo Switch',
          priority: 'High',
          price: 299,
          image_url: null,
          purchased: 0,
        },
        {
          name: 'Birthday Wishlist',
          id: 2,
          wishlist_id: 1,
          item: 'AirPods Pro',
          priority: 'Medium',
          price: 249,
          image_url: null,
          purchased: 0,
        },
      ])

    const screen = renderRoute('/wishlists/1')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading your wishlist')
      ).not.toBeInTheDocument()
    })

    expect(screen.getByText('Birthday Wishlist')).toBeVisible()
    expect(screen.getByText('Nintendo Switch')).toBeVisible()
    expect(screen.getByText('AirPods Pro')).toBeVisible()

    expect(scope.isDone()).toBe(true)
  })
  it('Renders wishlist array with items', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/myWishlists/1?userId=1')
      .reply(500)

    const screen = renderRoute('/wishlists/1')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading your wishlist')
      ).not.toBeInTheDocument()
    })

    expect(
      screen.getByText('There was an error retrieving your wishlist')
    ).toBeVisible()

    expect(scope.isDone()).toBe(true)
  })
})
