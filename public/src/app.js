(function (angular) {
  var app = angular.module('iFundDistributor', ['ngRoute', 'ngMaterial','ngSanitize', 'md.data.table',
    'home',
    'splashscreen',
    'eventselection',
    'eventresults'
   ]);

  app.config(function($routeProvider, $compileProvider) {

    $compileProvider.preAssignBindingsEnabled(true);

    $routeProvider
      .when('/', { template: '<splashscreen></splashscreen>' })
      .when('/home', { template: '<home></home>' })
      .when('/eventselection', { template: '<eventselection></eventselection>' })
      .when('/eventresults', { template: '<eventresults></eventresults>' })
      .otherwise({ redirectTo: '/' });
  });

})(window.angular);
