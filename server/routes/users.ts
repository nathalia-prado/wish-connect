import express from 'express'
import { addFriend, getAllUsers, removeFriend } from '../db/functions/db'

const router = express.Router()

//todo remove hardcoded auth ID and replace with token
router.get('/', async (req, res) => {
  try {
    const userId = 'auth0|123456'
    const users = (await getAllUsers(userId)).map(user => {
      if (typeof user.friends === 'string') {
        return { ...user, friends: user.friends?.split(',').map((id: string) => Number(id)) }
      } else return { ...user, friends: Number(user.friends) }
    })

    res.json(users)
  } catch (e) {
    console.log(`An error has occurred at ${req.path}: ${e}`)
    res.status(500).json({message: e})
  }
})


// todo remove hardcoded values
router.post('/friend/:id', async (req, res) => {
  try {
    const userId = 'auth0|123456'
    const friendId = Number(req.params.id)
    if (isNaN(friendId)) res.status(400).json({message: 'Invalid Friend ID'})
    else await addFriend(userId, friendId)

    res.status(200).end()
  } catch (e) {
    console.log(`An error has occurred at ${req.path}: ${e}`)
    res.status(500).json(`An error has occurred`)
  }
})

router.delete('/friend/:id', async (req, res) => {
  try {
    const userId = 'auth0|123456'
    const friendId = Number(req.params.id)
    if (isNaN(friendId)) res.status(400).json({message: 'Invalid Friend ID'})
    else await removeFriend(userId, friendId)

    res.status(200).end()
  } catch (e) {
    console.log(`An error has occurred at ${req.path}: ${e}`)
    res.status(500).json({message: `An error has occurred`})
  }
})



export default router