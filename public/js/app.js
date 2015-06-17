var app = angular.module('empreendaApp', ['ngRoute', 'ngMaterial']);

// Config
app.config(function ($interpolateProvider, $routeProvider) {
  // Interpolate angular symbols as {[{ }]}
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');

  $routeProvider
    .when('/', {
      templateUrl: 'team-list.html',
      controller: 'ListController',
      resolve: {
        teamList: function (teamService) {
          var list = teamService.getAll();

          return list;
        }
      }
    })
    .when('/vote/:team', {
      templateUrl: 'vote.html',
      controller: 'VoteController',
      resolve: {
        vote: function ($route, voteService) {
          var vote = voteService.getByTeam($route.current.params.team);

          return vote;
        }
      }
    });
});


/** ------------
   Controller
---------------- */
// Header Controller
app.controller('HeaderController', function ($scope, $mdDialog) {
  // Logout user
  $scope.logout = function (ev) {
    var confirm = $mdDialog.confirm({
      title: 'Deseja sair do sistema?',
      content: 'Tem certeza que deseja sair do sistema?',
      ok: 'Sim',
      cancel: 'Não',
      targetEvent: ev
    });

    var dialog = $mdDialog.show(confirm);

    dialog.then(function () {
      window.location.replace('/logout');
    });
  };
});


// Main Controller
app.controller('ListController', function ($scope, $mdDialog, $location, teamList) {
  $scope.teams = teamList.teams;

  // Vote in a team
  $scope.vote = function (team) {
    $location.url('/vote/' + team._id);
  };
});


// Vote Controller
app.controller('VoteController', function ($scope, $mdDialog, voteService, vote, $location) {
  $scope.team = vote.team;
  $scope.points = vote.points;

  // Calculate the total points
  // Cancel voting
  $scope.cancel = function () {
    $location.url('/');
  };

  // Save voting
  $scope.save = function () {
    $scope.loader = true;

    var vote = voteService.post($scope.team._id, $scope.points);

    vote.then(function () {
      // after saving close the dialog
      $location.url('/');
    });
  };
});


/** ------------
   Directive
---------------- */
// Show points label
app.directive('pointLabel', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<span>{{ value }}</span>',
    scope: {
      data: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('data', function (oldVal, newVal) {
        if (scope.data == 1) {
          scope.value = scope.data + ' ponto';

        } else {
          scope.value = scope.data + ' pontos';
        }
      });
    }
  };
});

// Calculate points
app.directive('calculateTotal', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<span>{{ total }}</span>',
    scope: {
      points: '=',
      showMax: '='
    },
    link: function (scope, element, attrs) {
      if (scope.points) {
        scope.$watchCollection('points', function () {
          var total = scope.points.originality +
            scope.points.presentation +
            scope.points.potential +
            scope.points.viability +
            scope.points.appeal +
            scope.points.adherence;

          if (scope.showMax) {
            total += '/30';
          }

          scope.total = total;
        });

      } else {
        scope.total = 0;
      }
    }
  };
});

/** ------------
    Factory
---------------- */
// Team
app.factory('teamService', function ($http) {
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
app.factory('voteService', function ($http) {
  var path    = './vote',
      factory = {};

  factory.getByTeam = function (team) {
    var vote = $http.get(path + '/' + team).then(function (resp) {
      return resp.data;
    });

    return vote;
  };

  factory.post = function (teamId, points) {
    var vote = $http.post(path, { teamId: teamId, points: points }).then(function (resp) {
      return resp.data;
    });

    return vote;
  };

  return factory;
});

