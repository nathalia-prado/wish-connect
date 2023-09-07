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
    isLoading: wishlistItemsLoading,
    error: wishlistItemsLoadingError,
  } = useQuery(['wishlist', 'users', friendId, wishlistId], () =>
    getFriendSingleWishlist(wishlistId || '1')
  )

  const {
    data: friendDetails,
    isLoading: friendDetailsLoading,
    error: friendDetailsError,
  } = useQuery(['users', 'friend', friendId], () =>
    getFriendsDetails(friendId || '1')
  )

  if (wishlistItemsLoadingError instanceof Error)
    return (
      <p>
        {wishlistItemsLoadingError.message} Error fetching friends wishlist
        items!
      </p>
    )

  if (wishlistItemsLoading) return <p>Loading ...</p>

  if (friendDetailsError instanceof Error)
    return <p>{friendDetailsError.message} Error fetching friends details!</p>

  if (friendDetailsLoading) return <p>Loading ...</p>

  return (
    <>
      <h2>{friendDetails.fullName}</h2>
      {wishlistItems.map((item: Item) => (
        <ul key={item.id}>
          <li>{item.item}</li>
          <li>{item.priority}</li>
          <li>{item.price}</li>
        </ul>
      ))}
    </>
  )
}
