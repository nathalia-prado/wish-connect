import connection from '../connection'

function getFriendsWishlistsByAuthId(id: string, db = connection) {
  const subQuery =  connection('users AS u')
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .join('wishlist AS w', 'w.user_id', '=', 'u.id')
    .select( 'w.user_id AS friendId',
      'w.description',
      'w.name',
      'w.id AS wishlistId',
      'f.friend_id AS userId',
      'u.username',
      'u.full_name AS fullName'
    )
    .as('s')


  return db('users AS u').select('s.*')
    .join(subQuery, 's.userId', '=', 'u.id')
    .where('u.auth0_id', id)
}

export {getFriendsWishlistsByAuthId}