var app = angular.module('empreendaAppLogin', ['ngMaterial']);

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

