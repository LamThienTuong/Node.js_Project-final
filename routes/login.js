var express = require('express');
var router = express.Router();
const session = require('express-session');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const User = require('../models/User');

app.use(session({ secret: 'NordictShop',
                  cookie: {
                    maxAge: 60 * 60 * 1000
                  }
                },
                {
                  password: User.pass,

                }
                )
        );

router.get('/', function(req, res) {
  res.locals.title = 'Express';
  res.locals.authenticated = req.password.authenticated;

  res.render('login');
});

router.post('/login', function(req, res) {
  const { username, password } = req.body;
  console.log('login:', username, password);

  User.findOne({ username })
    .exec()
    .then(user => {
      if (user && username === user.username && password === user.password) {
        req.session.authenticated = true;
      }

      res.redirect('/');
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = router;
