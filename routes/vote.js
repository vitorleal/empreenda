var Vote = require('../db/vote'),
    Team = require('../db/team');


// Vote
var vote = {
  get: function getVote (req, res) {
    var data   = req.query,
        userId = req.cookies.userId;

    // Find for vote with the user id and the team id
    var vote = Vote.findOne({ user: userId, team: data.teamId }).exec(function (err, vote) {
      if (vote) {
        return res.send({
          points: vote.points
        });
      }

      // If object not found send blank votes
      res.send({
        points: {
          originality: 0,
          presentation: 0,
          potential: 0,
          viability: 0,
          appeal: 0
        }
      });
    });
  },

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

