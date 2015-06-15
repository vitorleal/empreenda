var mongoose = require("mongoose");


// Default team schema
var teamSchema = new mongoose.Schema({
  name: {
    trim: true,
    type: String
  },
  order: {
    default: 0,
    type: Number
  }
});

// Team model
var Team = mongoose.model('Team', teamSchema);


exports = module.exports = Team;

