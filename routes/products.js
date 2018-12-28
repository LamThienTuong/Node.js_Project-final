var express = require("express");
var router = express.Router();
const Product = require("../models/Product");

// GET /api/products
router.get("/", (req, res) => {
  Product.find({})
    .exec()
    .then(products => {
      // res.index.sendRest(products)
      res.render("products", {
        productsList: products
      });
    })
    .catch(err => {
      res.index.sendRest(err);
    });
});

router.get(`/:id`, (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(product => {
      res.render("productDetail", {
        productdetail: product
      });
    })
    .catch(err => {
      res.sendRest(err);
    });
});

module.exports = router;
