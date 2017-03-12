(function (angular) {

  angular
    .module('home', [])
    .component('home', {
      templateUrl: 'components/home/template.html',
      controller: function ($scope, $mdDialog, $http) {
      console.log("HEY")
        
    }
});

})(window.angular);
