import request from 'superagent'

export async function getFriendsWishlists(id: string) {
  const response = await request.get(`/api/v1/wishlists/${id}`)

  return response.body
}

export async function getAuthIdByUserId(id: number) {
  const response = await request.get(`/api/v1/wishlists/auth0_id/${id}`)
  const { auth0_id } = response.body
  return auth0_id
}
