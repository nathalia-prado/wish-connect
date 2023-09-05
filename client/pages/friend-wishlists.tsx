import getFriendsWishlists from '../apis/get-friend-wishlists'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { FriendWishlist } from '../../models/wishlist'

export default function FriendWishlists() {
  const { friendId } = useParams()

  const {
    data: friendWishlists,
    isLoading,
    error,
  } = useQuery(['wishlists', 'users', 'friend', friendId], () =>
    getFriendsWishlists(friendId || '1')
  )

  if (error instanceof Error)
    return <p>{error.message} Error fetching friends wishlists!</p>

  if (isLoading) return <p>Loading ...</p>

  // TODO: Get friend details to display on page

  return (
    <>
      <h2>Friends Wishlists</h2>
      {friendWishlists.map((wishlist: FriendWishlist) => (
        <>
          <Link key={wishlist.wishlist_id} to={`/${wishlist.wishlist_id}`}>
            {wishlist.name}
          </Link>
          <h3 key={wishlist.description}>{wishlist.description}</h3>
        </>
      ))}
    </>
  )
}
