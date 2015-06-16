var routes = {},
    User   = require('../db/user');

// Index route
routes.index = function index (req, res) {
  User.findById(req.cookies.userId, function (err, user) {
    res.render('index', { user: user });
  });
};

routes.auth = require('./auth');
routes.user = require('./user');
routes.vote = require('./vote');
routes.team = require('./team');

// Export module
exports = module.exports = routes;

