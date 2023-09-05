import request from 'superagent'

export function getFriendsWishlists(id: number) {
  return request.get(`/api/v1/wishlists/${id}`).then((res) => res.body)
}
