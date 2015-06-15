var config = require('../configs'),
    mongo  = require('mongoose');


// Connect to the db
var connect = function (callback) {
  mongo.connect(config.MONGOURL, function (err, db) {
    if (err) {
      return callback(err, null);
    }

    return callback(null, db);
  });
};


exports = module.exports = {
  connect: connect
};

