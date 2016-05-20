angular.module('CodePocket.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Authentication) {
  $scope.login = function() {
    Authentication.request();
  };
})

.controller('PlaylistsCtrl', function($scope, $http) {
  $scope.user = {};
  var token = "token " + window.localStorage.getItem("token");
  $http.get("https://api.github.com/users/jonathanmcdaniel", {
    headers: {'Authorization': token}
  })
    .success(function(data, status, headers,config){
      $scope.user =  data;
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
