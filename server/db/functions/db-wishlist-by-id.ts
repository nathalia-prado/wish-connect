import connection from '../connection.ts'

export function getWishListById(id: number, db = connection) {
  return (
    db('wishlist')
      .join('users', 'users.id', 'wishlist.user_id')
      .join('item', 'item.wishlist_id', 'wishlist.id')
      .where('wishlist.id', id)
      // .and('authId check)
      .select('wishlist.id as wishlistId', 'wishlist.name', 'item.*')
  )
}
