(function (angular) {

  angular
    .module('splashscreen', [])
    .component('splashscreen', {
      templateUrl: 'components/splashscreen/template.html',
      controller: function ($scope, $mdDialog, $http) {
      console.log("HEY")
        
    }
});

})(window.angular);