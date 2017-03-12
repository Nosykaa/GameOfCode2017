(function (angular) {
  var app = angular.module('iFundDistributor', ['ngRoute', 'ngMaterial','ngSanitize', 'md.data.table',
    'home'
   ]);

  app.config(function($routeProvider, $compileProvider) {

    $compileProvider.preAssignBindingsEnabled(true);

    $routeProvider
      .when('/', { template: '<home></home>' })
      .otherwise({ redirectTo: '/' });
  });

})(window.angular);
