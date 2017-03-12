(function (angular) {

  angular
    .module('eventresults', [])
    .component('eventresults', {
      templateUrl: 'components/eventresults/template.html',
      controller: function ($scope, $mdDialog, $http) {
        console.log("TOTO")
        
    }
});

})(window.angular);