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
    isLoading, //Making sure that we are consistent with our naming conventions is the best way to avoid confusion.
    error, //As above, be consistent with naming conventions.
  } = useQuery(['wishlists', 'users', 'friend', friendId], () =>
    getFriendsWishlists(friendId || '1')
  )

  if (error instanceof Error)
    return <p>{error.message} Error fetching friends wishlists!</p>

  if (isLoading) return <p>Loading ...</p>

  if (friendDetailsError instanceof Error)
    return <p>{friendDetailsError.message} Error fetching friends wishlists!</p>

  if (friendDetailsLoading) return <p>Loading ...</p>

  return (
    <>
      <h2>{friendDetails.fullName}</h2>
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
