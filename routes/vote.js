var db = require('../db');


// Vote
var vote = {
  get: function getVote (req, res) {
    res.send({ vote: true });
  },
  post: function postVote (req, res) {
    res.send({ saved: true });
  }
};


exports = module.exports = vote;

