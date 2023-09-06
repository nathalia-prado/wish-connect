// // @vitest-environment jsdom
// import {
//   describe,
//   it,
//   expect,
//   vi,
//   beforeAll,
//   beforeEach,
//   afterAll,
// } from 'vitest'
// import { render, screen } from '@testing-library/react'
// import * as api from '../../../client/apis/get-friend-wishlists.ts'
// import * as db from '../../../server/db/functions/db.ts'
// import App from '../../../client/components/layout/app-layout.tsx'
// import connection from '../../db/connection.ts'

// vi.mock('../../../client/apis/get-friend-wishlists.ts')

// beforeAll(() => {
//   return connection.migrate.latest()
// })

// beforeEach(async () => {
//   await connection.seed.run()
// })

// afterAll(async () => {
//   await connection.destroy()
// })

// describe('Load Page', () => {
//   it('Loadings an friends wishlist', async () => {
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

//     render(<App />)

//     const message = await screen.findByText('Test Buddy')
//     expect(message).toBeVisible()
//     expect(message.textContent).toMatch(/Test Buddy/)
//     expect(api.getFriendsDetails).toHaveBeenCalled()
//   })
// })
