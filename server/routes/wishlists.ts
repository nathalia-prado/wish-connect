import express from 'express'
<<<<<<< HEAD
import { getUserFriendsWishlists } from '../db/functions/db'
import { User } from '../../models/user'
import { Wishlist } from '../../models/wishlist'
import { checkJwt } from '../utils/auth'
import { addWishlist, editWishlist } from '../db/wishlist'
// import { addWishlist } from '../db/wishlist'
=======
import {
  getAuthId,
  getFriendDetails, //Make sure to import only necessary functions to the correct routes
  getUserFriendsWishlist,
} from '../db/functions/db'

import { JwtRequest } from '../utils/auth'
import checkJwt from '../utils/auth'
>>>>>>> dev

const router = express.Router()

// GET /api/v1/wishlists/friends/:friendId
router.get('/friends/:friendId', async (req, res) => {
  // TODO: add new routes file for user information rendering this obsolete

  try {
<<<<<<< HEAD
    const wishlists = await getUserFriendsWishlists(auth0_id)
    console.log(wishlists)
    //deconstructs the body of the response and
=======
    const friendId = req.params.friendId
    const { auth0_id: authId } = await getAuthId(friendId)
    const wishlists = await getUserFriendsWishlist(authId)
>>>>>>> dev

    res.json(wishlists)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

<<<<<<< HEAD
// POST / api / v1 / wishlists / add

router.post('/add', async (req, res) => {
  try {
    const wishlistData = req.body
    const wishlist = await addWishlist
    console.log(wishlistData)
    // Deconstructs the body of the response

    res.json(wishlist)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// PUT /api/v1/wishlists / edit
router.put('/wishlist/:wishlistId', async (req, res) => {
  try {
    const { wishlistId } = req.params
    const updatedData = req.body
    const updateWishlist = await editWishlist(wishlistId, updatedData)
    res.json(updateWishlist)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to update wishlist ${error.message}' })
  }
})
=======
export default router
>>>>>>> dev
