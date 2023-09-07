import express from 'express'
import {
  getAuthId,
  getWishlistItems,
  getUserFriendsWishlist,
} from '../db/functions/db'

const router = express.Router()

// GET /api/v1/wishlists/friends/:friendId
router.get('/friends/:friendId', async (req, res) => {
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

// /api/v1/wishlists/:wishlistId
router.get('/:wishlistId', async (req, res) => {
  try {
    const wishlistId = req.params.wishlistId
    const singleWishlist = await getWishlistItems(wishlistId)

    res.json(singleWishlist)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
