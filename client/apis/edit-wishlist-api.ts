import request from 'superagent'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editWishlist } from '../../server/db/wishlist'
import type { Wishlist } from '../../models/wishlist'

interface EditWishlist {
  id: string
  name: string
  description: string
  private: boolean
  user_id: string
}

export async function editWishList({
  id,
  name,
  description,
  private: isPrivate,
  user_id,
}: EditWishlist): Promise<void> {
  await request
    .patch(`/api/v1/wishlists/edit/${id}`)
    .send({ name, description, isPrivate, user_id })
}
