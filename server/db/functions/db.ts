import connection from '../connection'

export async function getUserFriendsWishlist(
  auth0_id: string,
  db = connection
) {
  const friendsWishlists = await db('friends')
    .join('users', 'friends.user_id', 'users.id')
    .join('wishlist', 'friends.friend_id', 'wishlist.user_id')
    .where('users.auth0_id', auth0_id)
    .select(
      'users.id',
      'users.auth0_id',
      'friends.user_id',
      'friends.friend_id',
      'wishlist.id as wishlist_id',
      'wishlist.name',
      'wishlist.description',
      'wishlist.user_id as wishlist_user_id',
      'wishlist.private'
    )
    .returning('*')

  return friendsWishlists
}

export async function getAuthId(userId: string, db = connection) {
  const authId = await db('users')
    .where('id', userId)
    .select('auth0_id')
    .first()

  return authId
}

export async function getFriendDetails(friendId: string, db = connection) {
  const friendDetails = await db('users')
    .where('id', friendId)
    .select('full_name as fullName')
    .first()

  return friendDetails
}
