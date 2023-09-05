import { Wishlist } from '../../../models/wishlist.ts'
import connection from '../connection.ts'

export function getMyWishlists(
  authId: string,
  db = connection
): Promise<Wishlist[]> {
  return (
    db('wishlist')
      .join('users', 'users.id', 'wishlist.user_id')
      .where('users.auth0_id', authId)
      // .and('authId check)
      .select('wishlist.*')
  )
}

export function getWishListById(id: number, authId: string, db = connection) {
  return db('wishlist')
    .join('users', 'users.id', 'wishlist.user_id')
    .join('item', 'item.wishlist_id', 'wishlist.id')
    .where('wishlist.id', id)
    .where('users.auth0_id', authId)
    .select('wishlist.id as wishlistId', 'wishlist.name', 'item.*')
}
