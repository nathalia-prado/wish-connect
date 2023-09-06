import express from 'express'
import { addItem, updateItem } from '../db/functions/db.ts'
import { getItem } from '../db/functions/db.ts'
import { NewItem, UpdatedItem } from '../../models/item.ts'

const router = express.Router()

// export default router

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

//////////////////////////////////////////////// attempting 2nd ticket

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

// router.put('/:wishlistId/item/:itemId', async (req, res) => {
//   try {
//     const wishlistId = Number(req.params.wishlistId)
//     const itemId = Number(req.params.itemId)

//     const updatedItem = await mutateItem(wishlistId, itemId)

//     if (updatedItem) {
//       res.json(updatedItem)
//     } else {
//       res.status(404).json({ error: 'Item not found' })
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: 'Server Error' })
//   }
// })

//////////////////////////////////////

// export interface Item {
//   id: number
//   wishlist_id: number
//   item: string
//   priority: string
//   price: number
//   purchased: boolean
// }

/* Router.put('/:wishlistId/item/:itemId', async (req, res, next) => {
  const updatedItem = await mutateItem(async () => {
      const id = Number(req.params.itemId)

      const {id, wishlist_id, item, priority, price, purchased} = req.body
      if (prop => req.body[prop] === undefined)
          return ('You did wrong. No wishes for you.')

      else {
          const updatedItem: Item = {
            id,
            wishlist_id,
            item,
            priority,
            price,
            purchased
          }
          const response = (await db.updateItem(updatedItem))[0]
          res.json(response)
      }
  }, next)
})

const updateLoo = (item: Item) => {
  return connection('items').update(item).where({id: item.id})
} */

// --------------------------------------------

router.put('/:wishlistId/item/:itemId', async (req, res) => {
  try {
    const wishlistId = Number(req.params.wishlistId)
    const itemId = Number(req.params.itemId)
    const { item, priority, price, purchased } = req.body
    const updatedItem: UpdatedItem = { item, priority, price, purchased }

    const response = await updateItem(updatedItem, wishlistId, itemId)
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
