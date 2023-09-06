import { useUserQuery } from '../lib/hooks/useUsers.ts'
import { Link, useSearchParams } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'

export default function Users() {
  const users = useUserQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  const [userQuery, setUserQuery] = useState(searchQuery ?? '')

  if (users.isLoading) return <h2>Loading Users...</h2>

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value })
    setUserQuery(e.target.value)
  }

  const filteredUsers = users?.data?.filter(user =>
    user?.full_name.toLowerCase().includes(userQuery))

  const userCards = filteredUsers?.map(user => {
    return (
      <div key={user.username}>
        <h3><Link to={`/${user.username}`}>{user.full_name}</Link></h3>
        {user.isFriend ? <button>Remove friend</button> : <button>Add friend</button>}
      </div>
    )
  })

  return (
    <div>
      <h1>Users</h1>
      <input type='text' value={userQuery} onChange={handleSearchChange} />
      <div>
        {userCards}
      </div>
    </div>
  )
}