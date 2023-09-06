import express from 'express'
import { getUserFriendsWishlists } from '../db/functions/db'

const router = express.Router()

router.get('/:auth0_id', async (req, res) => {
  const auth0_id: string = req.params.auth0_id
  const dbFunc = req.body.dbFunc || getUserFriendsWishlists
  try {
    const wishlists = await dbFunc(auth0_id)
    res.json(wishlists)
  } catch (err) {
    console.error('An error occurred:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
