import { Products } from '../models/products'

export const getProducts = (req, res) => {
	Products.get(function(err, products) {
		if (err) {
			res.json({
				status: 'error',
				message: err
			})
		}
		res.json({
			status: 'success',
			message: 'productss retrieved successfully',
			data: products
		})
	})
}

export const createProducts = (req, res) => {
	let products = new Products()
	products.name = req.body.name ? req.body.name : products.name
	products.price.regular = req.body.price.regular
	products.tags = req.body.tags
	// save the products and check for errors
	products.save(function(err) {
		// if (err)
		//     res.json(err);
		res.json({
			message: 'New products created!',
			data: products
		})
	})
}

export const getProductsById = (req, res) => {
	products.findById(req.params.products_id, function(err, products) {
		if (err) res.send(err)
		res.json({
			message: 'products details loading..',
			data: products
		})
	})
}

export const updateProductsById = (req, res) => {
	products.findById(req.params.products_id, function(err, products) {
		if (err) res.send(err)
		products.name = req.body.name ? req.body.name : products.name
		products.price.regular = req.body.price.regular
		products.tags = req.body.tags
		// save the products and check for errors
		products.save(function(err) {
			if (err) res.json(err)
			res.json({
				message: 'products Info updated',
				data: products
			})
		})
	})
}

export const deleteProductsById = (req, res) => {
	products.remove(
		{
			_id: req.params.products_id
		},
		function(err, products) {
			if (err) res.send(err)
			res.json({
				status: 'success',
				message: 'products deleted'
			})
		}
	)
}
