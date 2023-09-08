import { useUserQuery } from '../../hooks/use-users.ts'
import { Link, useSearchParams } from 'react-router-dom'
import React, { ChangeEvent, useState } from 'react'

// todo use JWT/auth0 token instead
const FAKE_TOKEN = 'replace_me'

export default function Users() {
  const { data: users, isLoading, addFriend, removeFriend } = useUserQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  const [userQuery, setUserQuery] = useState(searchQuery ?? '')

  if (isLoading) return <h2>Loading Users...</h2>

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value })
    setUserQuery(e.target.value)
  }

  const friendHandler = (type: 'add' | 'rm', id: number) => async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    //todo get real token here

    if (type === 'add') await addFriend.mutate({friendId: id, token: FAKE_TOKEN})
    else if (type === 'rm') await removeFriend.mutate({friendId: id, token: FAKE_TOKEN})
  }

  const filteredUsers = users?.filter(user =>
    user?.fullName.toLowerCase().includes(userQuery))

  const userCards = filteredUsers?.map(user => {
    return (
      <div key={user.username} className={'px-10 w-[20rem] py-5 border-white border-b-2 border-opacity-50 flex flex-col gap-5 place-items-center'}>
        <h3 className={'text-lg font-bold'}><Link to={`/${user.username}`}>{user.fullName}</Link></h3>
        <div className={'flex gap-5'}>
          {user.isFriend
            ? <button onClick={friendHandler('rm', user.id)} className={'py-2 px-3 rounded-full text-sm bg-white bg-opacity-90 text-gray-500'}>Remove friend</button>
            : <button onClick={friendHandler('add', user.id)} className={'py-2 px-3 rounded-full text-sm bg-white bg-opacity-90 text-gray-500'}>Add friend</button>}
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