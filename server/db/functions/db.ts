import connection from '../connection'
import { UserSearch } from '../../../models/user.ts'

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
}
/**
 * Returns a mapped list of users with a boolean value indicating if they are
 * a friend of the currently logged-in user.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {db=connection} db - Knex connection
 * @returns {UserSearch[]}
 */
export function getAllUsers(auth0Id: string, db = connection): Promise<UserSearch[]> {
  return db('users AS u')
    .select('u.id AS id', 'u.full_name AS fullName', 'u.username',
      db.raw('group_concat(f.friend_id, \',\') AS friends'),
      db.raw(`CASE WHEN u.id IN (
      SELECT f.friend_id
      FROM friends AS f
      JOIN users AS u ON u.id = f.user_id
      WHERE u.auth0_id = "${auth0Id}"
      ) THEN true ELSE false END AS isFriend`))
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .groupBy('u.id')
    .leftJoin('users AS c', 'c.id', '!=', 'u.id')
    .where('c.auth0_id', '=', auth0Id).as('b')
}

/**
 * Friends a user as a one-way transactional relationship.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {number} friendId - ID of the user to be friended
 * @param {db=connection} db - Knex connection
 */
export async function addFriend(auth0Id: string, friendId: number, db = connection) {
  return db.raw(`INSERT INTO friends (friend_id, user_id) VALUES (${friendId}, (SELECT id FROM users WHERE auth0_id = 'auth0|123456'))`)
}

/**
 * De-friends a user as a one-way transactional relationship.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {number} friendId - ID of the user to be de-friended
 * @param {db=connection} db - Knex connection
 */
export async function removeFriend(auth0Id: string, friendId: number, db = connection) {
  return db.raw(`DELETE FROM friends WHERE friend_id = ${friendId} AND user_id = (SELECT id FROM users WHERE auth0_id = 'auth0|123456')`)
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
