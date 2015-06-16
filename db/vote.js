var mongoose = require("mongoose");


// Default vote schema
var voteSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  points: {
    originality: {
      default: 0,
      type: Number
    },
    presentation: {
      default: 0,
      type: Number
    },
    potential: {
      default: 0,
      type: Number
    },
    viability: {
      default: 0,
      type: Number
    },
    appeal: {
      default: 0,
      type: Number
    }
  }
});

// User model
var Vote = mongoose.model('Vote', voteSchema);


exports = module.exports = Vote;

