var express = require("express");
var router = express.Router();
const users = require("../models/User");

// GET /api/products
router.get(`/`, (req, res) => {
  users
    .find({})
    .exec()
    .then(users => {
      // res.index.sendRest(products)
      res.render("user", {
        userList: users
      });
    })
    .catch(err => {
      res.index.sendRest(err);
    });
});

module.exports = router;
