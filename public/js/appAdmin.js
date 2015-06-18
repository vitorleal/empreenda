var app = angular.module('empreendaAppAdmin', ['ngMaterial']);

// Config
app.config(function ($mdThemingProvider, $interpolateProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('teal');

  // Interpolate angular symbols as {[{ }]}
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


/** ------------
   Controller
---------------- */

// Main Controller
app.controller('ListController', function ($scope, teams) {
  // Show loader
  $scope.loader = true;

  var getData = teams.get();

  getData.then(function (data) {
    $scope.teams = data.teams;
    $scope.loader = false;
  });
});


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
      if (scope.data == 1) {
        scope.value = scope.data.toFixed(1) + ' ponto';

      } else {
        scope.value = scope.data.toFixed(1) + ' pontos';
      }
    }
  };
});


/** ------------
    Factory
---------------- */
// Teams
app.factory('teams', function ($http) {
  var path    = './admin/data',
      factory = {};

  factory.get = function () {
    var teams = $http.get(path).then(function (resp) {
      return resp.data;
    });

    return teams;
  };

  return factory;
});

