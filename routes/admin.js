const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

/* GET home page. */
router.get("/", function(req, res, next) {
  let totalUser;
  let totalProduct;
  let totalCategory;
  User.count({}, (err, data) => {
    totalUser = data;
    console.log(totalUser);
  })
    .exec()
    .then(() => {
      Product.count({}, (err, data) => {
        totalProduct = data;
        console.log(totalProduct);
      })
        .exec()
        .then(() => {
          Category.count({}, (err, data) => {
            totalCategory = data;
            console.log(totalCategory);
          })
            .exec()
            .then(() => {
              res.render("admin", {
                tUser: totalUser,
                tProduct: totalProduct,
                tCategory: totalCategory
              });
            });
        });
    });
});

module.exports = router;
