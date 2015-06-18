var Team = require('../db/team'),
    Vote = require('../db/vote'),
    mongoose = require('mongoose');


// Team
var team = {
  get: function getTeam (req, res) {
    res.send({ team: true  });
  },

  post: function postTeam (req, res) {
    var data = req.body,
        team = new Team();

    team.name = data.name;
    team.order = data.order;
    team.save();

    res.send({ saved: true });
  },

  getAll: function getAllTeams (req, res) {
    Team.find({}).populate({
      path: 'votes',
      match: {
        user: req.cookies.userId
      },
      select: 'points',
      options: {
        limit: 1
      }
    }).sort('order').exec(function (err, result) {
      Vote.aggregate([{
        $match: {
          user: new mongoose.Types.ObjectId(req.cookies.userId)
        }
      }, {
        $project: {
          _id: '$team',
          totalPonts: {
            $add: [
              '$points.originality',
              '$points.presentation',
              '$points.potential',
              '$points.viability',
              '$points.appeal',
              '$points.adherence'
            ]
          }
        }
      }, {
        $sort: {
          totalPonts: -1
        }
      }, {
        $limit: 3
      }], function (err, votes) {
        res.send({ teams: result, preferred: votes });
      });
    });
  }
};


exports = module.exports = team;

