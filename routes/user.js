var db   = require('../db');


// User
var user = {
  get: function getUser (req, res) {
    db.connect(function (err, db) {

    });

    res.send({ user: true });
  },

  post: function postUser (req, res) {
    db.connect(function (err, db) {
      var data = req.body,
          user = new User();

      user.name = data.name;
      user.email = data.email;
      user.save();

      res.send({ saved: true });
    });
  }
};


exports = module.exports = user;
