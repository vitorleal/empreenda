var app = angular.module('empreendaApp', ['ngMaterial']);

// Config
app.config(function ($mdThemingProvider, $interpolateProvider) {
  $mdThemingProvider.theme('default');

  // Interpolate angular symbols as {[{ }]}
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


/** ------------
   Controller
---------------- */

// Login Controller
app.controller('LoginController', function ($scope, $mdDialog, login) {
  $scope.auth = function () {
    var auth = login.auth($scope.email);

    auth.then(function (resp) {
      if (!resp.auth) {
        var alert = $mdDialog.alert({
          parent: angular.element(document.body),
          title: 'Email não encontrado',
          content: 'O email '+ $scope.email +' não está cadastrado na plataforma.',
          ok: 'fechar'
        });

        $mdDialog.show(alert);
      }

      if (resp.auth) {
        window.location.replace('/');
      }
    });
  };
});


// Main Controller
app.controller('ListController', function ($scope, $mdDialog, teams) {
  var getTeams = teams.getAll();

  $scope.loader = true;

  getTeams.then(function (resp) {
    $scope.teams = resp.teams;
    $scope.loader = false;
  });

  // Calculate total
  $scope.calculateTotal = function (team) {
    return 0;
  };

  // Vote in a team
  $scope.vote = function (id) {
    var dialog = $mdDialog.show({
      controller: VoteController,
      templateUrl: './templates/vote.tmpl.html',
      parent : angular.element(document.body),
      locals: {
        team: $scope.teams[id]
      }
    });

    dialog.then(function (answer) {
      console.log('You said the information was "' + answer + '".');

    }, function () {
      console.log('You cancelled the dialog.');
    });
  };
});


// Vote Controller
function VoteController ($scope, $mdDialog, vote, team) {
  $scope.team = team;
  $scope.points = {};

  // Initial points value
  $scope.points.originality = team.points.originality;
  $scope.points.presentation = team.points.presentation;
  $scope.points.potential = team.points.potential;
  $scope.points.viability = team.points.viability;
  $scope.points.appeal = team.points.appeal;

  // Calculate the total points
  $scope.calculateTotal = function () {
    var total = $scope.points.originality +
      $scope.points.presentation +
      $scope.points.potential +
      $scope.points.viability +
      $scope.points.appeal;

    return total;
  };

  $scope.calculateTotal();

  // Cancel voting
  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  // Save voting
  $scope.save = function () {
    $mdDialog.hide({
      team: team,
      points: $scope.points
    });
  };
}


/** ------------
    Factory
---------------- */

// Login
app.factory('login', function ($http) {
  var path = './login',
      factory = {};

  // Login by email
  factory.auth = function (email) {
    var login = $http.post(path, { email: email }).then(function (resp) {
      return resp.data;
    });

    return login;
  };

  return factory;
});


// Teams
app.factory('teams', function ($http) {
  var path    = './team/all',
      factory = {};

  // Get list of teams
  factory.getAll = function () {
    var teams = $http.get(path).then(function (resp) {
      return resp.data;
    });

    return teams;
  };

  return factory;
});


// Vote
app.factory('vote', function ($http) {
  var path    = './vote',
      factory = {};

  factory.get = function (user, team) {
    var vote = $http.get(path + '/' + user + '/' + team).then(function (resp) {
      return resp.data;
    });

    return vote;
  };

  return factory;
});

