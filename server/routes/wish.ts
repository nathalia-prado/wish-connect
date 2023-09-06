import express from 'express'
import * as db from '../db/functions/db.ts'
import { NewItem, UpdatedItem } from '../../models/item.ts'

const router = express.Router()

router.post('/:wishlistId/item', async (req, res) => {
  const dbFunc = req.body.dbFunc || db.addItem
  try {
    const wishlistId = Number(req.params.wishlistId)
    const newItem: NewItem = req.body
    newItem.wishlist_id = wishlistId

    const wish = await dbFunc(newItem)
    console.log(wish)
    res.json(wish)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:wishlistId/item/:itemId', async (req, res) => {
  const dbFunc = req.body.dbFunc || db.getItem
  try {
    const wishlistId = Number(req.params.wishlistId)
    const itemId = Number(req.params.itemId)

    const item = await dbFunc(wishlistId, itemId)
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
  const dbFunc = req.body.dbFunc || db.updateItem
  try {
    const wishlistId = Number(req.params.wishlistId)
    const itemId = Number(req.params.itemId)
    const { item, priority, price, purchased } = req.body
    const updatedItem: UpdatedItem = { item, priority, price, purchased }

    const response = await dbFunc(updatedItem, wishlistId, itemId)
    if (response) {
      res.json(response)
    } else {
      res.status(404).json({ error: 'Item not found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server Error' })
  }
})

export default router
