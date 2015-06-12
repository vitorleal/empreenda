var routes = {};

// Index route
routes.index = function index (req, res) {
  res.render('index');
};


// Teams
routes.teams = {
  getAll: function getAllTeams (req, res) {
    res.send({ teams: [{
        name: 'Grupo 1'
      }, {
        name: 'Grupo 2'
      }, {
        name: 'Grupo 3'
      }, {
        name: 'Grupo 4'
      }
    ]});
  }
};


// Vote
routes.vote = {
  get: function getVote (req, res) {
    res.send({ saved: true });
  },
  post: function postVote (req, res) {
    res.send({ saved: true });
  }
};


// Export module
module.exports = routes;

