const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		regular: {
			type: String,
			required: true
		}
	},
	tags: {
		type: Array
    },
	create_date: {
		type: Date,
		default: Date.now
	}
})

export const Products = mongoose.model('products', productsSchema)
