import { UserSearch } from '../../models/user.ts'
import request from 'superagent'

const URL = `/api/v1`

const getAllUsers = (): Promise<UserSearch[]> => {
  return request
    .get(`${URL}/users`)
    .then(res => res.body)
    .catch(e => console.log(`An error has occurred: ${e}`))
}

const addFriend = ({ friendId, token }: { friendId: number, token: string })
  : Promise<void> => {
  return request
    .post(`${URL}/users/friend/${friendId}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => res.body)
    .catch(e => console.log(`An error has occurred: ${e}`))
}

const removeFriend = ({ friendId, token }: { friendId: number, token: string })
  : Promise<void> => {
  return request
    .delete(`${URL}/users/friend/${friendId}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => res.body)
    .catch(e => console.log(`An error has occurred: ${e}`))
}

export { getAllUsers, removeFriend, addFriend }
