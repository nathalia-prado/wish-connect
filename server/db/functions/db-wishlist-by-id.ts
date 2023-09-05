import { Item } from '../../../models/item.ts'
import { Wishlist } from '../../../models/wishlist.ts'
import connection from '../connection.ts'

interface WishlistItem extends Item {
  name: string
}

export async function getMyWishlists(
  authId: string,
  db = connection
): Promise<Wishlist[]> {
  const wishlists = await db('wishlist')
    .join('users', 'users.id', 'wishlist.user_id')
    .where('users.auth0_id', authId)
    // .and('authId check)
    .select('wishlist.*')

  return wishlists
}

export async function getWishListById(
  id: number,
  authId: string,
  db = connection
): Promise<WishlistItem[]> {
  const wishlist = await db('wishlist')
    .join('users', 'users.id', 'wishlist.user_id')
    .join('item', 'item.wishlist_id', 'wishlist.id')
    .where('wishlist.id', id)
    .where('users.auth0_id', authId)
    .select('wishlist.name', 'item.*')

  return wishlist
}
