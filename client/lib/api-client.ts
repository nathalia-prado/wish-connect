import { UserSearch } from '../../models/user.ts'
import request from 'superagent'

const URL = `/api/v1`

const getAllUsers = (): Promise<UserSearch[]> => {
  return request
    .get(`${URL}/users`)
    .then(res => res.body)
    .catch(e => console.log(`An error has occurred: ${e}`))
}

export {getAllUsers}
