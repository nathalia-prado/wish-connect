import express from 'express'
import {
  deleteItem,
  deleteWishlist,
  getMyWishlists,
  getWishListById,
} from '../db/functions/db-wishlist-by-id'

const router = express.Router()

// GET /api/v1/wishlists/wishlists
router.get('/', async (req, res) => {
  // add auth0Id param that is not hard-coded

  // const userId = Number(req.query.userId)
  const userId = 1
  try {
    const wishlist = await getMyWishlists(userId)

    res.json(wishlist)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// GET /api/v1/wishlists/:wishlistId
router.get('/:wishlistId', async (req, res) => {
  //Get all wishlists for all friends of a user
  // const wishlistId = Number(req.params.wishlistId)
  // const userId = Number(req.query.userId)
  const wishlistId = 1
  const userId = 1

  try {
    const wishlist = await getWishListById(wishlistId, userId)

    res.json(wishlist)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/:wishlistId', async (req, res) => {
  const wishlistId = Number(req.params.wishlistId)
  try {
    await deleteWishlist(wishlistId)
    res.status(204).send()
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/wishlist/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId)
  try {
    await deleteItem(itemId)
    res.status(204).send()
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
