import express from 'express'
import todo from './todos'
import products from './products'

const router = express.Router()
router.get('/', (req, res) => res.send('Hello World with Express'))
router.use('/todos', todo)
router.use('/products', products)
export default router
