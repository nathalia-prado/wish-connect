import request from 'superagent'

export async function getFriendsWishlists(id: string) {
  const response = await request.get(`/api/v1/wishlists/${id}`)

  return response.body
}
