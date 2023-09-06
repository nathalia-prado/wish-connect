import connection from '../connection'

export async function getUserFriendsWishlits(
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

  return friendsWishlists
}

/**
 * Returns a mapped list of users with a boolean value indicating if they are
 * a friend of the currently logged-in user.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {db=connection} db - Knex connection
 */
export function getAllUsers(auth0Id: string, db = connection) {
  return db('users AS u').select('u.id', 'u.full_name', 'u.username',
    db.raw('group_concat(f.friend_id, \',\') AS friends'))
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .groupBy('u.id')

}