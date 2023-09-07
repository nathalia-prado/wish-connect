import express from 'express'
import { getFriendsWishlistsByAuthId } from '../db/functions/db'
import { JwtRequest } from '../utils/auth'
import checkJwt from '../utils/auth'
import { getAuthId, getUserFriendsWishlist } from '../db/functions/db'


const router = express.Router()
// GET /api/v1/wishlists

//todo remove hardcoded auth ID and replace with token
router.get('/', async (req, res, next) => {
  try {
    const userId = 'auth0|123456'
    const wishlists = await getFriendsWishlistsByAuthId(userId)

    res.json(wishlists)

  } catch (e) {
    console.log(`An error has occurred at ${req.path} - ${e}`)
    res.status(500).send('Internal server error')
  }
})


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
