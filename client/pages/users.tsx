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
    user?.fullName.toLowerCase().includes(userQuery))

  const userCards = filteredUsers?.map(user => {
    return (
      <div key={user.username} className={'px-10 py-5 border-white border-b-2 border-opacity-50 flex flex-col gap-5 place-items-center'}>
        <h3 className={'text-lg font-bold'}><Link to={`/${user.username}`}>{user.fullName}</Link></h3>
        <div className={'flex gap-5'}>
          {user.isFriend
            ? <button className={'py-2 px-3 rounded-full text-sm bg-white bg-opacity-90 text-gray-500'}>Remove friend</button>
            : <button className={'py-2 px-3 rounded-full text-sm bg-white bg-opacity-90 text-gray-500'}>Add friend</button>}
          <Link to={`/${user.username}`}>
            <button className={'py-2 px-3 rounded-full text-sm bg-white bg-opacity-90 text-gray-500'}>View Profile</button>
          </Link>
        </div>
      </div>
    )
  })

  return (
    <div className={'flex flex-col mt-[10%] place-items-center justify-center gap-5'}>
      <h1 className={'text-3xl font-bold'}>Users</h1>
      <label className={'flex flex-col gap-0.5'}>
        <span className={'ml-0.5'}>Search</span>
        <input className={'p-1 border rounded-xl'} type='text' value={userQuery} onChange={handleSearchChange} />
      </label>
      <div>
        {userCards}
      </div>
    </div>
  )
}