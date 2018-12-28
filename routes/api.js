const express = require("express");
const router = express.Router();

/**
 * Wrap a response JSON object with header & body parts as in Swagger/Loopback implementation
 * @param {Object} body
 */
function wrapJson(body) {
  if (body instanceof Error) {
    return {
      header: {
        status: 400,
        errorMessage: `${body.name}: ${body.message}`,
        currentDate: new Date()
      },
      body
    };
  }

  return {
    header: {
      status: 200,
      errorMessage: "",
      currentDate: new Date(),
      count: Array.isArray(body) ? body.length : body ? 1 : 0
    },
    body
  };
}

// a middleware to enhance res object
router.use((req, res, next) => {
  // attach a new method `sendRest` to res object for later use
  res.sendRest = body => {
    if (body instanceof Error) {
      res.statusCode = 400;
    }
    return res.json(wrapJson(body));
  };
  next();
});

/* API info */
router.get("/", function(req, res) {
  res.sendRest({
    version: "1.0.0",
    title: "Nordic Shop RESTful API",
    description: "RESTful API for Nordic Shop web app, OpenAPI compliance",
    contact: "Thanh Tran <thanh.tran@nordiccoder.com"
  });
});

require("../models/Category"); // make sure Category module is loaded
const Product = require("../models/Product");
const User = require("../models/User");

// STEP1: Virtual property
// GET /api/products
router.get(`/users`, (req, res) => {
  User.find({})
    .exec()
    .then(users => {
      res.sendRest(users);
    })
    .catch(err => {
      res.sendRest(err);
    });
});

// STEP2: Query.populate
// GET /api/products
router.get(`/products`, (req, res) => {
  // get product items
});

// STEP3: Full text search
// GET /api/products/search?q=key+word
router.get(`/products/search`, (req, res) => {
  const searchString = req.query.q;
  console.log(searchString);

  Product.find({
    $text: {
      $search: searchString,
      $caseSensitive: false
      // $language: 'en'
    }
  })
    .exec()
    .then(products => {
      res.sendRest(products);
    })
    .catch(err => {
      res.sendRest(err);
    });
});

module.exports = router;
