var Vote = require('../db/vote'),
    Team = require('../db/team');


// Vote
var vote = {
  get: function getVote (req, res) {
    var data   = req.params;
        userId = req.cookies.userId;

    // Find for vote with the user id and the team id
    var vote = Vote.findOne({ user: userId, team: data.team }).populate('team').exec(function (err, vote) {
      if (vote) {
        return res.send(vote);
      }

      // If object not found send blank votes
      Team.findById(data.team).exec(function (err, team) {
        var vote = {
          team: team,
          points: {
            originality: 0,
            presentation: 0,
            potential: 0,
            viability: 0,
            appeal: 0,
            adherence: 0
          }
        };

        res.send(vote);
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

