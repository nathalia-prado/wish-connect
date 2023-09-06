//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import nock from 'nock'
import { renderRoute } from '../../test/utils'

describe('<FriendsWishlist>', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlists')
      .reply(200, [
        {
            "friendId": 3,
            "description": "We are getting married and these are the things we need for our new home!",
            "name": "Wedding Registry",
            "wishlistId": 3,
            "userId": 1,
            "username": "bobsmith",
            "fullName": "Bob Smith"
        },
        {
            "friendId": 2,
            "description": "I have been good this year and these are the things I want for Christmas!",
            "name": "Christmas Wishlist",
            "wishlistId": 2,
            "userId": 1,
            "username": "janedoe",
            "fullName": "Jane Doe"
        },
      ])
      renderRoute('/')

    await waitFor(() => screen.getByText(/Loading/i))
    expect(scope.isDone()).toBe(true)
  })

  it('should render some friends wishlists in a unordered list', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlists')
      .reply(200, [
        {
            "friendId": 1,
            "description": "We are getting married and these are the things we need for our new home!",
            "name": "Wedding Registry Wishlist",
            "wishlistId": 1,
            "userId": 1,
            "username": "janedoe",
            "fullName": "Jane Doe"
        },
        {
          "friendId": 2,
          "description": "Groceries list",
          "name": "Groceries Wishlist",
          "wishlistId": 2,
          "userId": 1,
          "username": "test",
          "fullName": "Test"
      },
      ])
    
    renderRoute('/')
    
    await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i))
    const friendsWishlist = screen.getAllByText('list')

    expect(friendsWishlist).toMatchInlineSnapshot(`
      [
        <ul
          aria-labelledby="wishlist"
          class="wishlist-card-ul"
        >
          <li
            class="wishlist-card-li"
          >
            <img
              alt="Wishlist Wedding Registry"
              src="/images/wishlist-image.png"
            />
          </li>
          <li
            class="wishlist-card-li wishlist-card-li-data"
          >
            <p
              class="wishlist-card-li-name"
            >
              Wedding Registry
            </p>
            <p>
              We are getting married and these are the things we need for our new home!
            </p>
          </li>
        </ul>,
        <ul
          aria-labelledby="wishlist"
          class="wishlist-card-ul"
        >
          <li
            class="wishlist-card-li"
          >
            <img
              alt="Wishlist Christmas Wishlist"
              src="/images/wishlist-image.png"
            />
          </li>
          <li
            class="wishlist-card-li wishlist-card-li-data"
          >
            <p
              class="wishlist-card-li-name"
            >
              Christmas Wishlist
            </p>
            <p>
              I have been good this year and these are the things I want for Christmas!
            </p>
          </li>
        </ul>,
        <ul
          aria-labelledby="wishlist"
          class="wishlist-card-ul"
        >
          <li
            class="wishlist-card-li"
          >
            <img
              alt="Wishlist Wedding Registry Wishlist"
              src="/images/wishlist-image.png"
            />
          </li>
          <li
            class="wishlist-card-li wishlist-card-li-data"
          >
            <p
              class="wishlist-card-li-name"
            >
              Wedding Registry Wishlist
            </p>
            <p>
              We are getting married and these are the things we need for our new home!
            </p>
          </li>
        </ul>,
        <ul
          aria-labelledby="wishlist"
          class="wishlist-card-ul"
        >
          <li
            class="wishlist-card-li"
          >
            <img
              alt="Wishlist Groceries Wishlist"
              src="/images/wishlist-image.png"
            />
          </li>
          <li
            class="wishlist-card-li wishlist-card-li-data"
          >
            <p
              class="wishlist-card-li-name"
            >
              Groceries Wishlist
            </p>
            <p>
              Groceries list
            </p>
          </li>
        </ul>,
      ]
    `)
    expect(scope.isDone()).toBe(true)
  })


  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost').get('/api/v1/wishlists').reply(500)

    renderRoute('/')

    await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i))

    const error = screen.getByText(/Something went wrong/i)
    expect(error.textContent).toBe("Something went wrong!")
    expect(scope.isDone()).toBe(true)
  })
})