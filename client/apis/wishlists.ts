import request from 'superagent'

export async function getWishlists() {
  const response = await request.get('/api/v1/wishlists')
  // .set('Authorization', `Bearer ${token}`)

  return response.body
}
