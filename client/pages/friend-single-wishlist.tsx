import {
  getFriendSingleWishlist,
  getFriendsDetails,
} from '../apis/get-friend-wishlists'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Item } from '../../models/item'

export default function FriendWishlists() {
  const { friendId, wishlistId } = useParams()

  const {
    data: wishlistItems,
    isLoading,
    error,
  } = useQuery(['wishlist', 'users', friendId, wishlistId], () =>
    getFriendSingleWishlist(Number(wishlistId))
  )

  const {
    data: friendDetails,
    isLoading: friendDetailsLoading,
    error: friendDetailsError,
  } = useQuery(['users', 'friend', friendId], () =>
    getFriendsDetails(friendId || '1')
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
      {wishlistItems.map((x: Item) => (
        <ul key={x.id}>
          <li>{x.item}</li>
          <li>{x.priority}</li>
          <li>{x.price}</li>
        </ul>
      ))}
    </>
  )
}
