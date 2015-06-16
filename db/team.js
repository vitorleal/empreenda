var mongoose = require('mongoose');


// Team schema
//
// {
//   name: String,
//   order: Int,
//   votes: Array of Votes
// }
//
var teamSchema = new mongoose.Schema({
  name: {
    trim: true,
    type: String
  },
  order: {
    default: 0,
    type: Number
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }]
});

// Team model
var Team = mongoose.model('Team', teamSchema);


exports = module.exports = Team;

