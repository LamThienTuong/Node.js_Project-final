var express = require('express');
var router = express.Router();
const Product = require('../models/Product')

router.get(`/products/:id`, (req, res) => {
	const id = req.params.id;
	console.log(id);
	Product.findById({
		id: req.params.id
	})
	.exec()
	.then((Product) =>{
		res.index.sendRest(products);
		/*
		res.render("productDetail" ,{
			productdetail: Product
		}) */      
	})
	.catch((err)=>{
		console.log('asdasd');
	    res.sendRest(err);
	})
  });

module.exports = router;
