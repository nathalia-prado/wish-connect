import connection from '../connection'
import { Wishlist } from '../../../models/wishlist'
import { NewWishlist } from '../../../models/newWishlist'

import { Item, NewItem, UpdatedItem } from '../../../models/item'

import { UserSearch } from '../../../models/user.ts'

import { FriendWishlist } from '../../../models/wishlist.ts'

function getFriendsWishlistsByAuthId(
  id: string,
  db = connection
): Promise<FriendWishlist[]> {
  const subQuery = connection('users AS u')
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .join('wishlist AS w', 'w.user_id', '=', 'u.id')
    .select(
      'w.user_id AS friendId',
      'w.description',
      'w.name',
      'w.id AS wishlistId',
      'f.friend_id AS userId',
      'u.username',
      'u.full_name AS fullName'
    )
    .where('w.private', '=', 0)
    .as('s')

  return db('users AS u')
    .select('s.*')
    .join(subQuery, 's.userId', '=', 'u.id')
    .where('u.auth0_id', id)
}

export { getFriendsWishlistsByAuthId }

export async function getUserFriendsWishlists(
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
export async function addWishlist(
  wishlistData: NewWishlist
): Promise<Wishlist> {
  //  const {name, description, private, user_id} = newWishlist
  const addedWishlist = await connection(`wishlist`)
    .insert({
      user_id: wishlistData.user_id,
      name: wishlistData.name,
      description: wishlistData.description,
      private: wishlistData.isPrivate,
    })
    .returning('*')
  return addedWishlist[0]
}

export async function addItem(newItem: NewItem, db = connection) {
  return db('item').insert(newItem).returning('*')
}

export async function getItem(
  wishlistId: number,
  itemId: number,
  db = connection
): Promise<NewItem | undefined> {
  const item = await db('item')
    .where({
      wishlist_id: wishlistId,
      id: itemId,
    })
    .select('*')
    .first()

  return item
}

export async function updateItem(
  itemUpdate: UpdatedItem,
  wishlistId: number, // Don't need this
  itemId: number,
  db = connection
): Promise<Item | undefined> {
  const { item, priority, price, purchased } = itemUpdate
  const newItemVersion: UpdatedItem = {
    item,
    priority,
    price,
    purchased,
  }

  const updatedItem: Item | undefined = await db('item')
    .where({
      wishlist_id: wishlistId, // Don't need this
      id: itemId,
    })
    .update(newItemVersion)
    .returning('*')
    .first()

  return updatedItem
}

/**
 * Returns a mapped list of users with a boolean value indicating if they are
 * a friend of the currently logged-in user.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {db=connection} db - Knex connection
 * @returns {UserSearch[]}
 */

export function getAllUsers(
  auth0Id: string,
  db = connection
): Promise<UserSearch[]> {
  return db('users AS u')
    .select(
      'u.id AS id',
      'u.full_name AS fullName',
      'u.username',
      db.raw("group_concat(f.friend_id, ',') AS friends"),
      db.raw(`CASE WHEN u.id IN (
      SELECT f.friend_id
      FROM friends AS f
      JOIN users AS u ON u.id = f.user_id
      WHERE u.auth0_id = "${auth0Id}"
      ) THEN true ELSE false END AS isFriend`)
    )
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .groupBy('u.id')
    .leftJoin('users AS c', 'c.id', '!=', 'u.id')
    .where('c.auth0_id', '=', auth0Id)
    .as('b')
}

/**
 * Friends a user as a one-way transactional relationship.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {number} friendId - ID of the user to be friended
 * @param {db=connection} db - Knex connection
 */
export async function addFriend(
  auth0Id: string,
  friendId: number,
  db = connection
) {
  return db.raw(
    `INSERT INTO friends (friend_id, user_id) VALUES (${friendId}, (SELECT id FROM users WHERE auth0_id = 'auth0|123456'))`
  )
}

/**
 * De-friends a user as a one-way transactional relationship.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {number} friendId - ID of the user to be de-friended
 * @param {db=connection} db - Knex connection
 */
export async function removeFriend(
  auth0Id: string,
  friendId: number,
  db = connection
) {
  return db.raw(
    `DELETE FROM friends WHERE friend_id = ${friendId} AND user_id = (SELECT id FROM users WHERE auth0_id = 'auth0|123456')`
  )
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

export async function getWishlistItems(wishlistId: string) {
  const wishlist = await connection('item')
    .where('wishlist_id', wishlistId)
    .select('id', 'wishlist_id', 'item', 'priority', 'price', 'purchased')

  return wishlist
}
