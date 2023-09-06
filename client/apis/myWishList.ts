import request from 'superagent'

export async function getMyWishlists(token: string) {
  const response = await request
    .get('/api/v1/myWishlists')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function getWishlistById(id: number, token: string) {
  const response = await request
    .get(`/api/v1/myWishlists/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
