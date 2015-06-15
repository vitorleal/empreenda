var configs = require('../configs'),
    mongo   = require('mongoose'),
    session = require('express-session'),
    connectMongo = require('connect-mongo')(session);


// Connect to the db
var connect = function (callback) {
  mongo.connect(configs.MONGOURL);
};


// Session manager
var sessionManager = {
  secret: configs.SECRET,
  store: new connectMongo({
    url: configs.MONGOURL,
    ttl: 7 * 24 * 60 * 60
  })
};


exports = module.exports = {
  connect: connect,
  sessionManager: sessionManager
};

