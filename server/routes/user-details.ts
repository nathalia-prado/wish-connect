import express from 'express'

import { User } from '../../models/user'
import { Wishlist } from '../../models/wishlist'

import { checkJwt } from '../utils/auth'
import { getFriendDetails } from '../db/functions/db'

const router = express.Router()

// GET /api/v1/user-details
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const userDetails = await getFriendDetails(userId)

    res.json(userDetails)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
