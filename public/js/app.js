var app = angular.module('empreendaApp', ['ngMaterial']);

// Config
app.config(function ($mdThemingProvider, $interpolateProvider) {
  $mdThemingProvider.theme('default');

  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


/** ------------
   Controller
---------------- */

// Main Controller
app.controller('ListController', function ($scope, $mdDialog, teams) {
  var getTeams = teams.getAll();

  getTeams.then(function (resp) {
    $scope.teams = resp.teams;
  });

  // Calculate total
  $scope.calculateTotal = function (team) {
    var total = team.points.originality +
      team.points.presentation +
      team.points.potential +
      team.points.viability +
      team.points.appeal;

    return total;
  };


  // Vote in a team
  $scope.vote = function (id) {
    var dialog = $mdDialog.show({
      controller : VoteController,
      templateUrl: './templates/vote.tmpl.html',
      parent     : angular.element(document.body),
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
function VoteController ($scope, $mdDialog, team) {
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

// Teams
app.factory('teams', function ($http) {
  var path    = './teams',
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

