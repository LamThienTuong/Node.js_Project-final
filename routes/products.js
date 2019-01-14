var express = require('express');
var router = express.Router();
const Product = require('../models/Product');


// GET /api/products
router.get('/', (req, res) => {
    Product.find({})
      .exec()
      .then(products => {
        // res.index.sendRest(products)
        res.render("products" ,{
          productsList: products
        })
      })
      .catch(err => {
        res.index.sendRest(err)
      })
  });

  //Product Detail
  router.get(`/:id`, (req, res) => {
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then((product) =>{
      res.render("productDetail" ,{
        productdetail: product
      })
    })
    .catch((err)=>{
        res.sendRest(err);
    })
    });

    router.get('/create_product', function(req, res) {
      res.render('product_create');
    });

    router.post(`/`, (req, res) => {
      Product.create(req.body)
        .then((user) =>{
          res.redirect('/admin/products')
        //res.sendRest(user);
        })
        .catch((err)=>{
        res.sendRest(err);
        })
    });

    // PATCH/products (update one)
      router.patch(`/:id`, (req, res) => {
      const id = req.params.id;
      const updateBody = req.body;
      Product.findByIdAndUpdate(id, updateBody, {runValidators: true})
      .exec()
      .then((product)=>{
      res.sendRest({...product.toObject() , ...updateBody});
      })
      .catch((err)=>{
      res.sendRest(err);
      })

  });

  // DELETE/products (delete one)
  router.delete(`/:id`, (req, res) => {
      // delete one document
      const id = req.params.id;
      Product.findByIdAndRemove(id)
      .exec()
      .then((product) =>{
      res.sendRest(product);
      })
      .catch((err)=>{
      res.sendRest(err);
      })
  });

  module.exports = router;
