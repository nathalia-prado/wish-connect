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

export async function addWish(
  auth0_id: number,
  wishlist_id: number,
  item: { item: string },
  priority: { priority: string },
  price: number,
  db = connection
) {
  return db('item')
    .insert({
      user_id: auth0_id,
      wishlist_id: wishlist_id,
      item: item.item,
      priority: priority.priority,
      price: price,
      purchased: false,
    })
    .then((ids) => {
      return getWish(ids[0])
    })
}
