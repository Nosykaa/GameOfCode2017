(function (angular) {

  angular
    .module('eventresults', [])
    .component('eventresults', {
      templateUrl: 'components/eventresults/template.html',

      controller: function ($scope, $mdDialog, $http, myService) {
       $scope.selectedTag = myService.get(function(res){
          $scope.selectedTag = res;
        });
        
       this.tagList = $http.get("http://localhost:3000/event/byTags/restaurant")
          .then(function (res) {
            this.tagList = res.data;
            console.log(JSON.stringify(this.tagList))
          }.bind(this))
          .catch(function (err) {
            console.error(err);
          });;

      
      let pplCount = $http.get("http://localhost:3000/event/interestCount/3")
          .then(function (ress) {
            pplCount = ress.data;
            console.log(JSON.stringify(pplCount))
          }.bind(this))
          .catch(function (err) {
            console.error(err);
          });;       
    }


});

})(window.angular);