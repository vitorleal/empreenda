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

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
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

