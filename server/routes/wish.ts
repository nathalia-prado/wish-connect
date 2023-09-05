import express from 'express'
import { addWish } from '../db/functions/db.ts'

const router = express.Router()

router.post('/', async (req, res) => {
  const post = req.body
  console.log(post)
  const added = await addWish(auth0_id:post.userId,
    wishlist_id:post.wishlist_id,
    item:post.item,
    priority:post.priority,
    price:post.price)
  res.json(added)
})

router.post('/:wishlistId/wish', async (req, res) => {
  const wishlistId = Number(req.params.wishlistId)
  const wishData = req.body
  console.log(wishData)
  const wish = await addWish(wishlistId, wishData)
  console.log(wish)
  res.json(wish)
})

export default router
