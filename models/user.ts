export interface User {
  id: number
  auth0_id: string
  username: string
  full_name: string
}

export interface UserSearch {
  id: number
  fullName: string
  username: string
  friends: string | number[]
  isFriend: boolean
}
