import connection from '../connection'
import { Wishlist } from '../../../models/wishlist'
import { NewWishlist } from '../../../models/newWishlist'

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

export async function addWishlist(
  wishlistData: NewWishlist
): Promise<Wishlist> {
  //  const {name, description, private, user_id} = newWishlist
  const [addedWishlist] = await connection(`wishlist`)
    .insert({
      user_id: wishlistData.user_id,
      name: wishlistData.name,
      description: wishlistData.description,
      private: wishlistData.private,
    })
    .returning('*')
  return addedWishlist
}
