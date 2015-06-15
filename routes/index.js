var routes = {};

// Index route
routes.index = function index (req, res) {
  res.render('index');
};

routes.login = require('./login');
routes.user = require('./user');
routes.vote = require('./vote');
routes.team = require('./team');

// Export module
exports = module.exports = routes;

