export interface Wishlist {
  id: number
  name: string
  description: string
  private: boolean
  user_id: number
  image_url: string
}

export interface FriendWishlist {
  id: number
  auth0_id: string
  user_id: number
  friend_id: number
  wishlist_id: number
  name: string
  description: string
  wishlist_user_id: number
  private: boolean
}
