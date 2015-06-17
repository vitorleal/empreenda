var Vote = require('../db/vote'),
    Team = require('../db/team');


// Vote
var vote = {
  post: function postVote (req, res) {
    var data   = req.body,
        userId = req.cookies.userId;

    // Create or update the vote
    Vote.findOneAndUpdate({ user: userId, team: data.teamId }, { points: data.points }, { upsert: true, new: true }, function (err, v) {
      // Push the vote to the team vote array
      Team.findByIdAndUpdate(data.teamId, { $addToSet: { 'votes': v } }, { safe: true, upsert: true }, function (err, team) {
        res.send({ saved: true });
      });
    });
  }
};


exports = module.exports = vote;

