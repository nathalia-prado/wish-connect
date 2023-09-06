export interface User {
  id: number
  auth0_id: string
  username: string
  full_name: string
}

export interface UserSearch {
  id: number
  full_name: string
  username: string
  friends: number[]
  isFriend: boolean
}
