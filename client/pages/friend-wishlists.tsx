import {
  getFriendsDetails,
  getFriendsWishlists,
} from '../apis/get-friend-wishlists'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { FriendWishlist } from '../../models/wishlist'

export default function FriendWishlists() {
  const { friendId } = useParams()

  const {
    data: friendDetails,
    isLoading: friendDetailsLoading,
    error: friendDetailsError,
  } = useQuery(['users', 'friend', friendId], () =>
    getFriendsDetails(friendId || '1')
  )

  const {
    data: friendWishlists,
    isLoading: friendWishlistsLoading,
    error: friendWishlistsError,
  } = useQuery(['wishlists', 'users', 'friend', friendId], () =>
    getFriendsWishlists(friendId || '1')
  )

  if (friendWishlistsError instanceof Error)
    return (
      <p>{friendWishlistsError.message} Error fetching friends wishlists!</p>
    )

  if (friendWishlistsLoading) return <p>Loading ...</p>

  if (friendDetailsError instanceof Error)
    return <p>{friendDetailsError.message} Error fetching friends wishlists!</p>

  if (friendDetailsLoading) return <p>Loading ...</p>

  return (
    <>
      <h2>{friendDetails.fullName}</h2>
      {friendWishlists.map((wishlist: FriendWishlist) => (
        <>
          <Link
            key={wishlist.wishlist_id}
            to={`/friends/${friendId}/${wishlist.wishlist_id}`}
          >
            {wishlist.name}
          </Link>
          <h3 key={wishlist.description}>{wishlist.description}</h3>
        </>
      ))}
    </>
  )
}
