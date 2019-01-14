var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

function wrapJson(body) {
	if (body instanceof Error) {
		return {
			header: {
				status: 400,
				errorMessage: `${body.name}: ${body.message}`,
				currentDate: new Date(),
			},
			body,
		}
	}

	return {
		header: {
			status: 200,
			errorMessage: '',
			currentDate: new Date(),
			count: Array.isArray(body) ? body.length : body ? 1 : 0,
		},
		body,
	}
}

// a middleware to enhance res object
router.use((req, res, next) => {
	// attach a new method `sendRest` to res object for later use
	res.sendRest = body => {
		if (body instanceof Error) {
			res.statusCode = 400
		}
		return res.json(wrapJson(body))
	}
	next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
    let totalUser;
    let totalProduct;
    let totalCategory;
    User.count({}, (err, data) => {
      totalUser = data;
      console.log(totalUser);
    })
    .exec()
    .then(()=>{
      Product.count({}, (err, data) => {
        totalProduct = data;
        console.log(totalProduct);
      })
      .exec()
      .then(()=> {
        Category.count({}, (err, data) => {
          totalCategory = data;
          console.log(totalCategory);
        })
        .exec()
        .then(()=>{
          res.render('admin', {
            tUser : totalUser,
            tProduct : totalProduct,
            tCategory :  totalCategory,
          });
        })
      })
    })
  });



  module.exports = router;
