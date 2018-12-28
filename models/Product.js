const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: { type: String, text: true },
	image: String,
	thumbnail: String,
	shortDescription: { type: String, text: true },
	category: {
		type: String,
		ref: 'Category',
	},
	salePrice: Number,
	originalPrice: Number,
	images: [String],
	thumbnails: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
