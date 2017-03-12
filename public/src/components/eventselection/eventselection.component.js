(function (angular) {

  angular
    .module('eventselection', [])
    .component('eventselection', {
      templateUrl: 'components/eventselection/template.html',
      controller: function ($scope, $mdDialog, $http) {
        
        this.tagList = $http.get("http://localhost:3000/event/distinctEventTags")
          .then(function (res) {
            this.tagList = res.data;
            console.log(JSON.stringify(this.tagList))
          }.bind(this))
          .catch(function (err) {
            console.error(err);
          });;

        
    }
});

})(window.angular);