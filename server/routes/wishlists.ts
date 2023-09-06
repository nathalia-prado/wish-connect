import express from 'express'
import { getUserFriendsWishlits } from '../db/functions/db'
import { JwtRequest } from '../utils/auth'
import checkJwt from '../utils/auth'

const router = express.Router()

// GET /api/v1/wishlists
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  //Get all wishlists for all friends of a user

  const auth0_id = req.auth?.sub

  if (!auth0_id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const wishlists = await getUserFriendsWishlits(auth0_id)
    console.log(wishlists)
    //deconstructs the body of the response and

    res.json(wishlists)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
