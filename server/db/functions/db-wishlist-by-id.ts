import { Item } from '../../../models/item.ts'
import { Wishlist } from '../../../models/wishlist.ts'
import connection from '../connection.ts'

interface WishlistItem extends Item {
  name: string
}

export async function getMyWishlists(
  userId: number,
  db = connection
): Promise<Wishlist[]> {
  const wishlists = await db('wishlist')
    .join('users', 'users.id', 'wishlist.user_id')
    .where('users.id', userId)
    // .and('authId check)
    .select('wishlist.*')

  return wishlists
}

export async function getWishListById(
  id: number,
  userId: number,
  db = connection
): Promise<WishlistItem[]> {
  const wishlist = await db('wishlist')
    .join('users', 'users.id', 'wishlist.user_id')
    .join('item', 'item.wishlist_id', 'wishlist.id')
    .where('wishlist.id', id)
    .where('users.id', userId)
    .select('wishlist.name', 'item.*')

  return wishlist
}
