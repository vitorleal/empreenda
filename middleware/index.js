var middleware = {};


// Get user id
middleware.userId = function userId () {
  return function (req, res, next) {
    // If is admin url ignore user id cookie
    if (/\/admin/.test(req.url)) {
      return next();
    }

    // If no user authenticated redirect to login page
    if (!req.cookies.hasOwnProperty('userId') && req.url !== '/login') {
      res.redirect('/login');

    // Else continue to the requested page
    } else {
      req.userId = req.cookies.userId;
      next();
    }
  };
};


// Export module
exports = module.exports = middleware;

