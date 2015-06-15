var routes = {};

// Index route
routes.index = function index (req, res) {
  res.render('index');
};


// Teams
routes.teams = {
  getAll: function getAllTeams (req, res) {
    res.send({ teams: [{
        name: 'Vivo Vantagens',
        points: {
          originality: 0,
          presentation: 0,
          potential: 0,
          viability: 0,
          appeal: 1
        }
      }, {
        name: 'Sklr',
        points: {
          originality: 5,
          presentation: 3,
          potential: 2,
          viability: 1,
          appeal: 4
        }
      }, {
        name: 'Dimensionamento Digital',
        points: {
          originality: 1,
          presentation: 3,
          potential: 1,
          viability: 3,
          appeal: 5
        }
      }, {
        name: 'Doutor Antena',
        points: {
          originality: 4,
          presentation: 3,
          potential: 4,
          viability: 2,
          appeal: 4
        }
      }, {
        name: 'Rodovias Conectadas',
        points: {
          originality: 3,
          presentation: 4,
          potential: 2,
          viability: 5,
          appeal: 4
        }
      }, {
        name: 'Vivo Atendimento Fast',
        points: {
          originality: 2,
          presentation: 1,
          potential: 3,
          viability: 3,
          appeal: 3
        }
      }, {
        name: 'Vivo me liga',
        points: {
          originality: 1,
          presentation: 2,
          potential: 2,
          viability: 1,
          appeal: 2
        }
      }, {
        name: 'Vivo Pet App',
        points: {
          originality: 3,
          presentation: 2,
          potential: 2,
          viability: 1,
          appeal: 1
        }
      }, {
        name: 'Vivo plano certo',
        points: {
          originality: 3,
          presentation: 5,
          potential: 4,
          viability: 4,
          appeal: 2
        }
      }, {
        name: 'Vivo Solidário',
        points: {
          originality: 1,
          presentation: 2,
          potential: 1,
          viability: 1,
          appeal: 1
        }
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

