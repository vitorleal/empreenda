// User
var user = {
  get: function getUser (req, res) {
    res.send({ user: true });
  },

  post: function postUser (req, res) {
    var data = req.body,
        user = new User();

    user.name = data.name;
    user.email = data.email;
    user.save();

    res.send({ saved: true });
  }
};


exports = module.exports = user;
