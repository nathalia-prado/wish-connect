import request from 'superagent'

export async function getFriendsWishlists(friendId: string) {
  const response = await request.get(`/api/v1/wishlists/friends/${friendId}`)

  console.group('Response from server/routes/wishlists.ts:')
  console.log(response.body)
  console.groupEnd()

  return response.body
}

export async function getFriendsDetails(friendId: string) {
  const response = await request.get(`/api/v1/user-details/${friendId}`)

  console.group('Response from server/routes/user-details.ts:')
  console.log(response.body)
  console.groupEnd()

  return response.body
}
