import express from 'express'
import * as ProductsController from '../controllers/products'

const router = express.Router()

router
	.route('/')
	.get(ProductsController.getProducts)
	.post(ProductsController.createProducts)

export default router
