import request from 'superagent'

export default async function getFriendsWishlists(friendId: string) {
  const response = await request.get(`/api/v1/wishlists/friends/${friendId}`)

  console.group('Response from server/routes/wishlists.ts:')
  console.log(response.body)
  console.groupEnd()

  return response.body
}
