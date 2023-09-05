import {
  getFriendsWishlists,
  getAuthIdByUserId,
} from '../apis/get-friends-wishlists'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export default function FriendWishlists() {
  const { userId } = useParams()
  const {
    data: authId,
    isLoading: userIdIsLoading,
    error: userIdError,
  } = useQuery(['users', userId], () => getAuthIdByUserId(Number(userId)))

  console.log(authId)

  const {
    data: friendWishlist,
    isLoading,
    error,
  } = useQuery(['wishlists', 'users', authId], () =>
    getFriendsWishlists(authId)
  )

  console.log(friendWishlist)

  if (error instanceof Error) {
    return (
      <>
        <p>Something went wrong ... {error.message}</p>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <p>Loading ...</p>
      </>
    )
  }

  if (userIdError instanceof Error) {
    return (
      <>
        <p>Something went wrong ... {userIdError.message}</p>
      </>
    )
  }

  if (userIdIsLoading) {
    return (
      <>
        <p>Loading ...</p>
      </>
    )
  }

  return (
    <>
      <h2>Friend Wishlists</h2>

      {friendWishlist.map((x) => (
        <>
          <Link to={`/${x.wishlist_id}`}>{x.name} </Link>
          <h1>{x.description} </h1>
        </>
      ))}
    </>
  )
}
