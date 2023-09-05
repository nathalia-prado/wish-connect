import request from 'superagent'

export async function getMyWishlists(token: string) {
  const response = await request
    .get('myWishList/wishlists')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function 