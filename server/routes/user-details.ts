import express from 'express'
import { getFriendDetails } from '../db/functions/db'

const router = express.Router()

// GET /api/v1/user-details
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const userDetails = await getFriendDetails(userId)

    res.json(userDetails)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
