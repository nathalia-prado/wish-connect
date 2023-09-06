//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  within,
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
          auth0_id: 'auth0|123456',
          user_id: 1,
          friend_id: 2,
          wishlist_id: 2,
          name: 'Christmas Wishlist',
          description:
            'I have been good this year and these are the things I want for Christmas!',
          wishlist_user_id: 2,
          private: 1,
        },
      ])

    const scope1 = nock('http://localhost')
      .get('/api/v1/user-details/1')
      .reply(200, [
        {
          fullName: 'Test Buddy',
        },
      ])

    renderRoute('/friends/1')

    await waitFor(() => screen.getByText(/Loading .../i))
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

// // @vitest-environment jsdom
// import { describe, it, expect, vi } from 'vitest'
// import { render, screen } from '@testing-library/react'
// import * as api from '../get-friend-wishlists.ts'
// import App from '../../pages/friend-wishlists.tsx'
// import { BrowserRouter } from 'react-router-dom'

// import { renderRoute } from '../../test/utils.tsx'

// vi.mock('../get-friend-wishlists.ts')

// describe('Load Page', () => {
//   const screen = renderRoute('/friends/1')
//   it('Loadings status', () => {
//     // render(
//     //   <BrowserRouter>
//     //     <App />
//     //   </BrowserRouter>
//     // )

//     expect(screen.getByText('Loading ...')).toBeVisible()
//     expect(api.getFriendsDetails).toHaveBeenCalled()
//   })

//   it.skip('Loadings an friends wishlist', async () => {
//     vi.mocked(api.getFriendsWishlists).mockImplementation(async () => {
//       return {
//         id: 1,
//         auth0_id: 'test',
//         user_id: 1,
//         friend_id: 1,
//         wishlist_id: 1,
//         name: 'test',
//         description: 'test',
//         wishlist_user_id: 1,
//         private: false,
//       }
//     })

//     vi.mocked(api.getFriendsDetails).mockImplementation(async () => {
//       return { fullName: 'Test Buddy' }
//     })

//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     )

//     const message = await screen.findByText('Test Buddy')
//     expect(message).toBeVisible()
//     expect(message.textContent).toMatch(/Test Buddy/)
//     expect(api.getFriendsDetails).toHaveBeenCalled()
//   })
// })
