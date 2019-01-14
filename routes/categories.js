var express = require('express');
var router = express.Router();
const Category = require('../models/Category')

// GET /api/categories
router.get(`/`, (req, res) => {
    Category.find({})
      .exec()
      .then(categories => {
        // res.index.sendRest(products)
        res.render("categories" ,{
          categoriesList: categories
        })
      })
      .catch(err => {
        res.index.sendRest(err)
      })
  });

  //POST create user
router.post(`/`, (req, res) => {
  Category.create(req.body)
  .then((categories) =>{
  res.redirect('/admin/categories')
})
  .catch((err)=>{
  res.sendRest(err);
  })
});

router.delete(`/:id`, (req, res) => {
  // delete one document
  const id = req.params.id;
  Category.findByIdAndRemove(id)
  .exec()
  .then((categories) =>{
  res.redirect('/admin/categories')
  })
  .catch((err)=>{
  res.sendRest(err);
  })
});

  module.exports = router;
