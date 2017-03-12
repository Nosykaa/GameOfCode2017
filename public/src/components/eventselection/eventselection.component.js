(function (angular) {

  angular
    .module('eventselection', [])
    .component('eventselection', {
      templateUrl: 'components/eventselection/template.html',
      controller: function ($scope, $mdDialog, $http, myService) {
        
        this.tagList = $http.get("http://localhost:3000/event/distinctEventTags")
          .then(function (res) {
            this.tagList = res.data;
            console.log(JSON.stringify(this.tagList))
          }.bind(this))
          .catch(function (err) {
            console.error(err);
          });;

        this.getEventsFromTags  = function(tag) {
            this.selectedTag = tag;
            myService.set(tag);
        }
        
    }
});

})(window.angular);