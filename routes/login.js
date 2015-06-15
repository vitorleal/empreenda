var db   = require('../db'),
    User = require('../db/user');


// Login routes
var login = {
  get: function login (req, res) {
    res.render('login');
  },
  post: function loginAuth (req, res) {
    var data = req.body;

    var connection = db.connect(function (err, db) {
      // Find user by email
      User.findOne({ email: data.email }).exec(function (err, user) {
        if (user) {
          // Save the user id in the cookies
          res.cookie('userId', user._id, {
            expires: new Date(Date.now() + (10 * 600 * 100000)),
            httpOnly: true
          });

          return res.send({ auth: true });
        }

        res.send({ auth: false });
      });
    });
  }
};


exports = module.exports = login;

