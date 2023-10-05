import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup, render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { beforeEach, expect } from 'vitest'
import { routes } from '../routes'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

beforeEach(cleanup)
expect.extend(matchers)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
    interface Matchers<R = void, T = {}>
      extends matchers.TestingLibraryMatchers<
        typeof expect.stringContaining,
        R
      > {}
  }
}

export function renderRoute(location: string) {
  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  })

  const user = userEvent.setup()
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )

  return { user, ...screen }
}
