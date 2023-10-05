// import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getWishlists } from '../apis/wishlists'
import { FriendsWishlist } from '../components/friends-wishlist'
import IconSpeech_bubble from '../components/icons/speech-bubble'
import { IfAuthenticated } from '../components/auth'

export default function Home() {
  // const { getAccessTokenSilently } = useAuth0()

  const {
    data: friendsWishlist,
    isLoading,
    isError,
  } = useQuery(['friendsWishlists'], async () => {
    // TODO After adding token, this line should be uncommented
    // const token = await getAccessTokenSilently()
    return getWishlists()
  })

  if (isError) {
    return <p>Something went wrong!</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className=" flex mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-8xl dark:text-white">
          Wish Connect
          <IconSpeech_bubble />
        </h1>
        <h2 className="flex italic text-gray-500">
          Connect with a community of dreams
        </h2>
        <IfAuthenticated>
          <FriendsWishlist friendsWishlist={friendsWishlist} />
        </IfAuthenticated>
      </div>
    </>
  )
}
