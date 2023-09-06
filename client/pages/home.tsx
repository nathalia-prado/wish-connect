import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getWishlists } from '../apis/wishlists'
import { FriendsWishlist } from '../components/friends-wishlist'

export default function Home() {

  const { getAccessTokenSilently } = useAuth0()

  const { data: friendsWishlist, isLoading, isError } = useQuery(['friendsWishlists'], async () => {
    // TODO After adding token, this line should be uncommented 
    // const token = await getAccessTokenSilently()
    return getWishlists({ token: '123' })
  })
  
  if (isError) {
    return <p>Something went wrong!</p>
  }
  
  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <FriendsWishlist friendsWishlist={friendsWishlist} />
    </>
  )
}
