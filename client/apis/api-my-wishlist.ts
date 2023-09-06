import request from 'superagent'
import { Wishlist } from '../../models/wishlist'

export async function getMyWishlists(userId: number): Promise<Wishlist[]> {
  const response = await request.get(`/api/v1/myWishlists?userId=${userId}`)
  return response.body
}

export async function getWishlistById(wishlistId: number, userId: number) {
  const response = await request.get(
    `/api/v1/myWishlists/${wishlistId}?userId=${userId}`
  )

  return response.body
}
