import express from 'express'
import { getAuthId, getUserFriendsWishlist } from '../db/functions/db'

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

// GET /api/v1/wishlists/auth0/:id
router.get('/auth0_id/:id', async (req, res) => {
  //Get all wishlists for all friends of a user
  const id = req.params.id

  try {
    const authId = await getAuthId(Number(id))
    console.log(authId)
    //deconstructs the body of the response and

    res.json(authId)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
