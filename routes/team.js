var Team = require('../db/team');


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
      return res.send({ teams: result });
    });
  }
};


exports = module.exports = team;

