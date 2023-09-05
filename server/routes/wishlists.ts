import express from 'express'
import {
  getAuthId,
  getFriendDetails,
  getUserFriendsWishlist,
} from '../db/functions/db'

import { User } from '../../models/user'
import { Wishlist } from '../../models/wishlist'

import { checkJwt } from '../utils/auth'

const router = express.Router()

// GET /api/v1/wishlists
router.get('/:auth0_id', async (req, res) => {
  //Get all wishlists for all friends of a user
  const auth0_id = req.params.auth0_id

  try {
    const wishlists = await getUserFriendsWishlist(auth0_id)
    console.log(wishlists)
    //deconstructs the body of the response and

    res.json(wishlists)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// GET /api/v1/wishlists/friends/:friendId
router.get('/friends/:friendId', async (req, res) => {
  // TODO: add new routes file for user information rendering this obsolete

  try {
    const friendId = req.params.friendId
    const { auth0_id: authId } = await getAuthId(friendId)
    const wishlists = await getUserFriendsWishlist(authId)

    res.json(wishlists)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
