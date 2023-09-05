import request from 'superagent'
import type { NewWishlist } from '../../models/newWishlist.ts'

interface AddWishlist {
  name: NewWishlist['name']
  description: NewWishlist['description']
  is_private: NewWishlist['private']
  user_id: NewWishlist['user_id']
}
export async function addWishlist({
  name,
  description,
  is_private,
  user_id,
}: AddWishlist): Promise<void> {
  await request
    .post('/api/v1/wishlists/add')
    .send({ name, description, is_private, user_id })
}

// export interface NewWishlist {
//   name: string
//   description: string
//   private: boolean
//   user_id: number
// }
