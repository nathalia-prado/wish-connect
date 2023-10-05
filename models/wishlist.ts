export interface Wishlist {
  id: number
  name: string
  description: string
  isPrivate: boolean
  user_id: number
  image_url: string
}

export interface FriendWishlist {
  friendId: number
  description: string
  name: string
  wishlistId: number
  userId: number
  username: string
  fullName: string
}


export interface EditWishlist {
  id: number
  name: string
  description: string
  isPrivate: boolean
  user_id: number
}

