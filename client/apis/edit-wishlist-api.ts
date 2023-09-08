import request from 'superagent'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { editWishlist } from '../../server/db/wishlist'
// import type { Wishlist } from '../../models/wishlist'
import { EditWishlist } from '../../models/wishlist'

export async function editWishList({
  id,
  name,
  description,
  isPrivate,
  user_id,
}: EditWishlist): Promise<void> {
  await request
    .patch(`/api/v1/wishlists/edit/${id}`)
    .send({ id, name, description, isPrivate, user_id })
  console.log(id, name, description, isPrivate, user_id)
}
