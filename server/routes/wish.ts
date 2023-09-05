import express from 'express'
import { addItem } from '../db/functions/db.ts'

const router = express.Router()

// router.post('/', async (req, res) => {
//   const NewItem= req.body
//   console.log(NewItem)
//   const added = await addItem(
//     wishlist_id:newItem.wishlist_id,
//     item:newItem.item,
//     priority:newItem.priority,
//     price:newItem.price
//     purchased:newItem.purchased)
//   res.json(added)
// })

// router.post('/:wishlistId/item', async (req, res) => {
//   const wishlistId = Number(req.params.wishlistId)
//   const newItem: NewItem = req.body
//   {...newItem, newItem.wishlist_id: wishlistId}
//   item.wishlist_id = wishlistId
//   console.log(newItem)
//   const wish = await addItem(newItem)
//   console.log(wish)
//   res.json(wish)
// })

export default router

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

export interface NewItem {
  wishlist_id: number
  item: string
  priority: string
  price: number
  purchased: boolean
}

// <form action="/wish" method="post">
//   <input type="text" name="wishlist_id" placeholder="wishlist_id">
//   <input type="text" name="item" placeholder="item">

// handlesubmit = async (e) => {
//   e.preventDefault()
//   const { wishlist_id, item, priority, price, purchased } = this.state
//  item.wishlist_id = wishlist_id
//  item.item = item
//  item.priority = priority
//  item.price = price
//  item.purchased = purchased
//
