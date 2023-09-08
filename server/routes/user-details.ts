import express from 'express'


import { User } from '../../models/user' //Make sure to import only necessary functions to the correct routes
import { Wishlist } from '../../models/wishlist'

import checkJwt from '../utils/auth' //Verify that you are importing the function in the right way (in this case, checkJwt is a default export so no curly braces are needed)


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
