var app = angular.module('empreendaApp', ['ngMaterial']);

// Config
app.config(function ($interpolateProvider) {
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

    // Try to authenticate the user by email
    auth.then(function (resp) {
      if (!resp.auth) {
        // If user not found show alert message
        var alert = $mdDialog.alert({
          parent: angular.element(document.body),
          title: 'Email não encontrado',
          content: 'O email '+ $scope.email +' não está cadastrado na plataforma.',
          ok: 'fechar'
        });

        $mdDialog.show(alert);
      }

      // If user exist redirect to the main content
      if (resp.auth) {
        window.location.replace('/');
      }
    });
  };
});


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
app.controller('ListController', function ($scope, $mdDialog, teams, votes) {
  var getTeams = teams.getAll();

  // Show loader
  $scope.loader = true;

  // get the teams data
  getTeams.then(function (resp) {
    $scope.teams = resp.teams;
    $scope.loader = false;
  });

  // Calculate total
  $scope.calculateTotal = function (votes) {
    if (votes && votes.length) {
      var points = votes[0].points,
          total  = points.originality +
            points.presentation +
            points.potential +
            points.viability +
            points.appeal +
            points.adherence;

      return total;

    } else {
      return 0;
    }
  };

  // Vote in a team
  $scope.openDialog = function (team) {
    // Create the vote dialog
    var dialog = $mdDialog.show({
      controller: VoteController,
      templateUrl: 'dialog-vote.html',
      parent: angular.element(document.querySelector('.content')),
      locals: {
        team: team
      }
    });

    // Returning from the dialog confirm
    dialog.then(function (data) {
      var getTeams = teams.getAll();
      // get the teams data
      getTeams.then(function (resp) {
        $scope.teams = resp.teams;
      });
    });
  };
});


// Vote Controller
function VoteController ($scope, $mdDialog, votes, team) {
  $scope.team = team;

  var points = (team.votes && team.votes.length) ? team.votes[0].points : null;

  $scope.points = {
    originality: (points) ? points.originality : 0,
    presentation: (points) ? points.presentation : 0,
    potential: (points) ? points.potential : 0,
    viability: (points) ? points.viability : 0,
    appeal: (points) ? points.appeal : 0,
    adherence: (points) ? points.adherence : 0
  };

  // Calculate the total points
  $scope.calculateTotal = function () {
    var total = $scope.points.originality +
      $scope.points.presentation +
      $scope.points.potential +
      $scope.points.viability +
      $scope.points.appeal +
      $scope.points.adherence;

    return total;
  };

  $scope.calculateTotal();

  // Cancel voting
  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  // Save voting
  $scope.save = function () {
    var vote = votes.post(team._id, $scope.points);

    vote.then(function () {
      // after saving close the dialog
      $mdDialog.hide();
    });
  };
}


/** ------------
   Directive
---------------- */
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


// Team
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
app.factory('votes', function ($http) {
  var path    = './vote',
      factory = {};

  // Save the vote information
  factory.post = function (teamId, points) {
    var vote = $http.post(path, { teamId: teamId, points: points }).then(function (resp) {
      return resp.data;
    });

    return vote;
  };

  return factory;
});

