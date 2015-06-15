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
    Team.find({}).sort('order').exec(function (err, result) {
      return res.send({ teams: result });
    });
  }
};


exports = module.exports = team;

