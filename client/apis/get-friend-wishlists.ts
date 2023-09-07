import request from 'superagent'

export async function getFriendsWishlists(friendId: string) {
  const response = await request.get(`/api/v1/wishlists/friends/${friendId}`)

  return response.body
}

export async function getFriendsDetails(friendId: string) {
  const response = await request.get(`/api/v1/user-details/${friendId}`)

  return response.body
}

export async function getFriendSingleWishlist(wishlistId: string) {
  const response = await request.get(`/api/v1/wishlists/${wishlistId}`)

  return response.body
}
