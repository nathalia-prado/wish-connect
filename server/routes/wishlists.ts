import express from 'express'

import { User } from '../../models/user'
import { Wishlist } from '../../models/wishlist'
import { addWishlist, editWishlist } from '../db/wishlist'



import { getUserFriendsWishlits } from '../db/functions/db'
import { User } from '../../models/user'
import { Wishlist } from '../../models/wishlist'
import { checkJwt } from '../utils/auth'
import { addWishlist } from '../db/wishlist'


import {
  getAuthId,
  getUserFriendsWishlist,
  getUserFriendsWishlists,
} from '../db/functions/db'

import { getFriendsWishlistsByAuthId } from '../db/functions/db'
import { JwtRequest } from '../utils/auth'
import checkJwt from '../utils/auth'
import { getAuthId, getUserFriendsWishlist } from '../db/functions/db'




const router = express.Router()
// GET /api/v1/wishlists

//todo remove hardcoded auth ID and replace with token
router.get('/', async (req, res, next) => {
  try {
    const userId = 'auth0|123456'
    const wishlists = await getFriendsWishlistsByAuthId(userId)

    res.json(wishlists)

  } catch (e) {
    console.log(`An error has occurred at ${req.path} - ${e}`)
    res.status(500).send('Internal server error')
  }
})


// GET /api/v1/wishlists/friends/:friendId
router.get('/friends/:friendId', async (req, res) => {
  try {
    const friendsWishlists = await getUserFriendsWishlists(auth0_id)
    console.log(friendsWishlists)
    //deconstructs the body of the response and
    const friendId = req.params.friendId
    const { auth0_id: authId } = await getAuthId(friendId)
    const wishlists = await getUserFriendsWishlist(authId)
    res.json(wishlists)
  } catch (err) {
    console.error('An error occurred:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})


// POST / api / v1 / add

router.post('/add', async (req, res) => {
  try {
    const wishlistData = req.body
    const wishlist = await addWishlist
    console.log(wishlistData)
    // Deconstructs the body of the response

    res.json(wishlist)

// GET /api/v1/wishlists/:auth0_id
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

// /api/v1/wishlists/:wishlistId
router.get('/:wishlistId', async (req, res) => {
  try {
    const wishlistId = req.params.wishlistId
    const singleWishlist = await getWishlistItems(wishlistId)

    res.json(singleWishlist)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// POST / api / v1 / wishlists / add

router.post('/add', async (req, res) => {
  try {
    const wishlistData = req.body
    const wishlist = await addWishlist
    console.log(wishlistData)
    // Deconstructs the body of the response

    res.json(wishlist)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// PUT /api/v1/wishlists / edit
router.patch('/edit/:wishlistId', async (req, res) => {
  try {
    const wishlistId = parseInt(req.params.wishlistId)
    const { name, description, isPrivate, userId } = req.body
    const updatedWishlist = await editWishlist(
      wishlistId,
      userId,
      name,
      description,
      isPrivate
    )
    res.json(updatedWishlist)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to update wishlist ${error.message}' })
  }
})
export default router
