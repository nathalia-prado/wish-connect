import express from 'express'
import { getUserFriendsWishlist } from '../db/functions/db'

import { User } from '../../models/user'
import { Wishlist } from '../../models/wishlist'

import { checkJwt } from '../utils/auth'

const router = express.Router()

// GET /api/v1/wishlists


export default router
