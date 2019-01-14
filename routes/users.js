var express = require('express');
var router = express.Router();
const User = require('../models/User')
const multer = require('multer');
const upload = multer({ dest: 'tmp' });

// GET /api/users
router.get(`/`, (req, res) => {
    User.find({})
    .exec()
    .then(users => {
      // res.index.sendRest(products)
      res.render("users" ,{
        userList: users
      })
    })
    .catch(err => {
      res.sendRest(err)
    });
});
//

//POST create user
router.post(`/`, (req, res) => {
  User.create(req.body)
    .then((user) =>{
      res.redirect('/admin/users')
    //res.sendRest(user);
    })
    .catch((err)=>{
    res.sendRest(err);
    })
});

//GET/admin/users/user_create Render
router.get('/user', function(req, res) {
  res.render('user');
});

router.patch(`/:id`, (req, res) => {
  const id = req.params.id;
  // update one document
  const updateBody = req.body;
  User.findByIdAndUpdate(id, updateBody, {runValidators: true})
  .exec()
  .then((user)=>{
  res.sendRest({...user.toObject() , ...updateBody});
  })
  .catch((err)=>{
  res.sendRest(err);
  })
});

router.delete(`/:id`, (req, res) => {
  // delete one document
  const id = req.params.id;
  User.findByIdAndRemove(id)
  .exec()
  .then((users) =>{
    res.redirect('/admin/users')
  })
  .catch((err)=>{
  res.sendRest(err);
  })
});

module.exports = router;
