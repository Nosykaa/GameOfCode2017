(function (angular) {

  angular
    .module('eventresults', [])
    .component('eventresults', {
      templateUrl: 'components/eventresults/template.html',
      controller: function ($scope, $mdDialog, $http, myService) {
        console.log("TOTO")
        $scope.selectedTag = myService.get(function(res){
          $scope.selectedTag = res;
        });
    }
});

})(window.angular);