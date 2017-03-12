(function (angular) {

  angular
    .module('eventresults', [])
    .component('eventresults', {
      templateUrl: 'components/eventresults/template.html',

      controller: function ($scope, $mdDialog, $http,myService) {
      this.tagList =  myService.get(function(res){
      this.tagList = $http.get("http://localhost:3000/event/byTags/" + res)
          .then(function (res) {
            this.tagList = res.data;
            console.log(JSON.stringify(this.tagList))
          }.bind(this))
           .catch(function (err) {
            console.error(err);
          });;
      }.bind(this))
      console.log(this.tagList)
    }
});

})(window.angular);