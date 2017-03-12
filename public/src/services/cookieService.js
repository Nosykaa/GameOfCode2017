(function (angular) {

  angular.module('iFundDistributor')
    .service('myService', function ($http) {
        var savedData = {}
        this.set = function (data) {
            savedData = data;
        }
        this.get = function (callback) { 
            callback (savedData);
        }
    });
})(window.angular);