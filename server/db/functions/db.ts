import connection from '../connection'
import { NewItem, UpdatedItem } from '../../../models/item'

<<<<<<< HEAD
export async function getUserFriendsWishlists(
=======
export async function getUserFriendsWishlist(
>>>>>>> dev
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
<<<<<<< HEAD
  return friendsWishlists
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
): Promise<NewItem | undefined> {
  const { item, priority, price, purchased } = itemUpdate
  const newItemVersion = {
    item,
    priority,
    price,
    purchased,
  }

  const updatedItem = await db('item')
    .where({
      wishlist_id: wishlistId, // Don't need this
      id: itemId,
    })
    .update(newItemVersion)
    .returning('*')

  return updatedItem[0]
=======
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
>>>>>>> dev
}
