import request from 'superagent'
import type { NewWishlist } from '../../models/newWishlist.ts'

interface AddWishlist {
  name: NewWishlist['name']
  description: NewWishlist['description']
  isPrivate: NewWishlist['isPrivate']
  user_id: NewWishlist['user_id']
}
export async function addWishlist({
  name,
  description,
  isPrivate,
  user_id,
}: AddWishlist): Promise<void> {
  await request
    .post('/api/v1/wishlist/add')
    .send({ name, description, isPrivate, user_id })
}

// export interface NewWishlist {
//   name: string
//   description: string
//   private: boolean
//   user_id: number
// }
