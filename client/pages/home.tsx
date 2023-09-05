import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getWishlists } from '../apis/wishlists'
import { FriendsWishlist } from '../components/friends-wishlist'

export default function Home() {

  /*
  const { getAccessTokenSilently } = useAuth0()

  const { data: friendsWishlist, isLoading, isError } = useQuery(['friendsWishlists'], async () => {
    const token = await getAccessTokenSilently()
    console.log(token, 'token')
    return getWishlists({ token })
  })

  console.log(friendsWishlist)
  
  if (isError) {
    return <div>Unexpected error</div>
  }
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  */

  // MOCKED DATA WORKING
  const friendsWishlist = [
      {
          "friendId": 3,
          "description": "We are getting married and these are the things we need for our new home!",
          "name": "Wedding Registry",
          "wishlistId": 3,
          "userId": 1,
          "username": "bobsmith",
          "fullName": "Bob Smith"
      },
      {
          "friendId": 2,
          "description": "I have been good this year and these are the things I want for Christmas!",
          "name": "Christmas Wishlist",
          "wishlistId": 2,
          "userId": 1,
          "username": "janedoe",
          "fullName": "Jane Doe"
      },
      {
        "friendId": 2,
        "description": "Party whishlist for my team!",
        "name": "Party Wishlist",
        "wishlistId": 3,
        "userId": 1,
        "username": "janedoe",
        "fullName": "Jane Doe"
      },
      {
        "friendId": 2,
        "description": "Groceries whishlist description!",
        "name": "Groceries Wishlist",
        "wishlistId": 4,
        "userId": 1,
        "username": "janedoe",
        "fullName": "Jane Doe"
    },
    {
      "friendId": 2,
      "description": "Bargain whishlist description!",
      "name": "Bargain Wishlist",
      "wishlistId": 5,
      "userId": 1,
      "username": "janedoe",
      "fullName": "Jane Doe"
    },
    {
      "friendId": 2,
      "description": "Gym whishlist description!",
      "name": "Gym Wishlist",
      "wishlistId": 6,
      "userId": 1,
      "username": "janedoe",
      "fullName": "Jane Doe"
    },
    {
      "friendId": 2,
      "description": "Petshop whishlist description!",
      "name": "Petshop Wishlist",
      "wishlistId": 7,
      "userId": 1,
      "username": "janedoe",
      "fullName": "Jane Doe"
    }
]

  return (
    <>
      <FriendsWishlist friendsWishlist={friendsWishlist} />
    </>
  )
}
