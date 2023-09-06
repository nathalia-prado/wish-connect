import express from 'express'
<<<<<<< HEAD
import { getUserFriendsWishlists } from '../db/functions/db'

const router = express.Router()

router.get('/:auth0_id', async (req, res) => {
  const auth0_id: string = req.params.auth0_id
  const dbFunc = req.body.dbFunc || getUserFriendsWishlists
  try {
    const wishlists = await dbFunc(auth0_id)
=======
import {
  getAuthId,
  getFriendDetails,
  getUserFriendsWishlist,
} from '../db/functions/db'

import { JwtRequest } from '../utils/auth'
import checkJwt from '../utils/auth'

const router = express.Router()

// GET /api/v1/wishlists/friends/:friendId
router.get('/friends/:friendId', async (req, res) => {
  // TODO: add new routes file for user information rendering this obsolete

  try {
    const friendId = req.params.friendId
    const { auth0_id: authId } = await getAuthId(friendId)
    const wishlists = await getUserFriendsWishlist(authId)

>>>>>>> dev
    res.json(wishlists)
  } catch (err) {
    console.error('An error occurred:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
