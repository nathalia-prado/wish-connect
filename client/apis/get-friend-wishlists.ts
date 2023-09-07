import request from 'superagent'

export async function getFriendsWishlists(friendId: string) {
  const response = await request.get(`/api/v1/wishlists/friends/${friendId}`)

  //Dispose of console logs when done debugging

  console.group('Response from server/routes/wishlists.ts:')
  console.log(response.body)
  console.groupEnd()

  return response.body
}

export async function getFriendsDetails(friendId: string) {
  const response = await request.get(`/api/v1/user-details/${friendId}`)

  //Dispose of console logs when done debugging

  console.group('Response from server/routes/user-details.ts:')
  console.log(response.body)
  console.groupEnd()

  return response.body
}
