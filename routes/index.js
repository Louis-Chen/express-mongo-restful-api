import express from 'express'
import todo from './todo'

const router = express.Router()

router.use('/api/v1/todos', todo)

export default router
