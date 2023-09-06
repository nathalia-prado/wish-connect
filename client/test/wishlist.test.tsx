//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
// import { renderRoute } from './setup.tsx'
import { waitFor } from '@testing-library/react'
import Wishlist from '../pages/wishlist.tsx'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routes } from '../routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
      expect(
        screen.queryByText('Loading your wishlist')
      ).not.toBeInTheDocument()
    })

    // screen.debug()
    expect(scope.isDone()).toBe(true)
  })
})

// function renderRoute(location: string) {
//   const router = createMemoryRouter(routes, {
//     initialEntries: [location],
//   })

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//     logger: {
//       log: console.log,
//       warn: console.warn,
//       error: () => {},
//     },
//   })

//   const screen = render(
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   )

//   return screen
// }
