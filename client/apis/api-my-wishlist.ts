import request from 'superagent'

export async function getMyWishlists(token: string) {
  const response = await request
    .get('/api/v1/wishlists/wishlists')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function getWishlistById(id: number, token: string) {
  const response = await request
    .get(`/api/v1/wishlists/wishlists/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
