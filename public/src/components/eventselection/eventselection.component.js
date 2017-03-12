(function (angular) {

  angular
    .module('eventselection', [])
    .component('eventselection', {
      templateUrl: 'components/eventselection/template.html',
      controller: function ($scope, $mdDialog, $http) {
        console.log("TOTO")
        
    }
});

})(window.angular);