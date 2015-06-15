var configs = require('../configs'),
    mongo   = require('mongoose');


// Connect to the db
var connect = function (callback) {
  mongo.connect(configs.MONGOURL);
};


exports = module.exports = {
  connect: connect
};

