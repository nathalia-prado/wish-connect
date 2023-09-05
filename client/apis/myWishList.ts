import request from 'superagent'

export async function getMyWishlists(token: string) {
  const response = await request
    .get('/api/v1/myWishlist/wishlists')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function getWishlistById(id: number, token: string) {
  const response = await request
    .get(`/api/v1/myWishlist/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
