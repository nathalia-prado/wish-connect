import connection from '../connection'
import { UserSearch } from '../../../models/user.ts'



/**
 * Returns a mapped list of users with a boolean value indicating if they are
 * a friend of the currently logged-in user.
 * @param {string} auth0Id - Auth0 ID of the current user
 * @param {db=connection} db - Knex connection
 * @returns {UserSearch[]}
 */
export async function getAllUsers(auth0Id: string, db = connection): Promise<UserSearch[]> {
  return db('users AS u')
    .select('u.id AS id', 'u.full_name AS fullName', 'u.username',
      db.raw('group_concat(f.friend_id, \',\') AS friends'),
      db.raw(`CASE WHEN u.id IN (
      SELECT f.friend_id
      FROM friends AS f
      JOIN users AS u ON u.id = f.user_id
      WHERE u.auth0_id = "${auth0Id}"
      ) THEN true ELSE false END AS isFriend`))
    .join('friends AS f', 'u.id', '=', 'f.user_id')
    .groupBy('u.id')
    .leftJoin('users AS c', 'c.id', '!=', 'u.id')
    .where('c.auth0_id', '=', auth0Id).as('b')
}
