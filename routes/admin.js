var routes = {},
    Team   = require('../db/team'),
    Vote   = require('../db/vote'),
    User   = require('../db/user');


// Admin page
routes.get = function admin (req, res) {
  res.render('admin.html');
};


// Admin data
routes.data = function adminData (req, res) {
  Vote.aggregate([{
    $group: {
      _id: '$team',
      team: {
        $first: '$team'
      },
      originality: {
        $sum: '$points.originality'
      },
      presentation: {
        $sum: '$points.presentation'
      },
      potential: {
        $sum: '$points.potential'
      },
      viability: {
        $sum: '$points.viability'
      },
      appeal: {
        $sum: '$points.appeal'
      },
      adherence: {
        $sum: '$points.adherence'
      },
      voteCount: {
        $sum: 1
      }
    }
  }, {
    $project: {
      _id: 0,
      team: 1,
      voteCount: 1,
      points: {
        $add: [
          '$originality',
          '$presentation',
          '$potential',
          '$viability',
          '$appeal',
          '$adherence'
        ]
      }
    }
  }, {
    $project: {
      team: 1,
      voteCount: 1,
      points: {
        $divide: ["$points", "$voteCount"]
      }
    }
  }, {
    $sort: {
      points: -1
    }

  }], function (err, result) {
    Team.populate(result, { path: 'team' }, function (err, r) {
      res.send({ teams: r });
    });
  });
};


exports = module.exports = routes;

