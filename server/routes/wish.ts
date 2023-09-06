import express from 'express'
import { addItem, updateItem } from '../db/functions/db.ts'
import { getItem } from '../db/functions/db.ts'
import { NewItem, UpdatedItem } from '../../models/item.ts'

const router = express.Router()

router.post('/:wishlistId/item', async (req, res) => {
  try {
    const wishlistId = Number(req.params.wishlistId)
    const newItem: NewItem = req.body
    newItem.wishlist_id = wishlistId

    const wish = await addItem(newItem)
    console.log(wish)
    res.json(wish)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:wishlistId/item/:itemId', async (req, res) => {
  try {
    const wishlistId = Number(req.params.wishlistId)
    const itemId = Number(req.params.itemId)

    const item = await getItem(wishlistId, itemId)
    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ error: 'Item not found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.put('/:wishlistId/item/:itemId', async (req, res) => {
  try {
    const wishlistId = Number(req.params.wishlistId) // Don't need this
    const itemId = Number(req.params.itemId)
    const { item, priority, price, purchased } = req.body
    const updatedItem: UpdatedItem = { item, priority, price, purchased }

    const response = await updateItem(updatedItem, wishlistId, itemId) // Don't need wishlistId
    if (response) {
      res.json(response)
    } else {
      return res.status(404).json({ error: 'Item not found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server Error' })
  }
})

export default router
