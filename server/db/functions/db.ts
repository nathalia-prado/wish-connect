import connection from '../connection'
import { FriendWishlist } from '../../../models/wishlist.ts'


function getFriendsWishlistsByAuthId(id: string, db = connection): Promise<FriendWishlist[]> {
  const subQuery =  connection('users AS u')
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .join('wishlist AS w', 'w.user_id', '=', 'u.id')
    .select( 'w.user_id AS friendId',
      'w.description',
      'w.name',
      'w.id AS wishlistId',
      'f.friend_id AS userId',
      'u.username',
      'u.full_name AS fullName'
    )
    .where('w.private', '=', 0)
    .as('s')

  return db('users AS u').select('s.*')
    .join(subQuery, 's.userId', '=', 'u.id')
    .where('u.auth0_id', id)
}

export {getFriendsWishlistsByAuthId}

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
