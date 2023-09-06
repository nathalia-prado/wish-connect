import * as Path from 'node:path'
import express from 'express'
import wishListRouter from './routes/wishlists'
<<<<<<< HEAD
import wish from './routes/wish'
=======
import userDetailsRouter from './routes/user-details'
>>>>>>> dev

const server = express()
server.use(express.json())
server.use('/api/v1/wishlists', wishListRouter)
<<<<<<< HEAD
server.use('/api/v1/wish', wish)
server.use('/api/v1/*', (req, res) => res.sendStatus(404))
=======
server.use('/api/v1/user-details', userDetailsRouter)
>>>>>>> dev

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
