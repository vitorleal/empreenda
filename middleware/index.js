var shortid    = require('shortId'),
    middleware = {};


// Generate a session id
middleware.sessionId = function sessionId () {
  return function (req, res, next) {
    // Get cookie id or generate a new one
    var id = req.cookies.id || shortid.generate();

    if (!req.cookies.hasOwnProperty('id')) {
      // If id ins not saved in cookie save and expire in one week
      res.cookie('id', id, {
        expires: new Date(Date.now() + (10 * 600 * 100000)),
        httpOnly: true
      });
    }

    // return the id in the req argument
    req.id = id;
    next();
  };
};


// Export module
exports = module.exports = middleware;

