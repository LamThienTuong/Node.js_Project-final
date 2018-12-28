var express = require("express");
var router = express.Router();
const categories = require("../models/Category");

// GET /api/products
router.get(`/`, (req, res) => {
  categories
    .find({})
    .exec()
    .then(categories => {
      // res.index.sendRest(products)
      res.render("categories", {
        categoriesList: categories
      });
    })
    .catch(err => {
      res.index.sendRest(err);
    });
});

module.exports = router;
