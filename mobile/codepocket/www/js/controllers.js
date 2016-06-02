angular.module('CodePocket.MenuCtrl', [])

.controller('MenuCtrl', function($scope, $http, Authentication, Users) {
  var token = "token " + window.localStorage.getItem("token");
  $http.get("https://api.github.com/users/jonathanmcdaniel", {
    headers: {'Authorization': token}
  })
  .success(function(data, status, headers,config){
    Users.set(data);
    $scope.user =  data;
  })
  .error(function(data, status, headers,config){
    console.log('data error');
  })
  .then(function(result){
  });
  $scope.login = function() {
    Authentication.request();
  };
})
.controller('ReposCtrl', function($scope, $http, Users) {
  var token = "token " + window.localStorage.getItem("token");
  $http.get("https://api.github.com/repos/jonathanmcdaniel/blog/contents/", {
    headers: {'Authorization': token}
  })
  .success(function(data, status, headers,config){
    $scope.repos =  data;
  })
  .error(function(data, status, headers,config){
    console.log('data error');
  })
  .then(function(result){
  });

})
.controller('ProfileCtrl', function($scope, $http, Users) {
  $scope.user = Users.get();
})
.controller('ProfileEventsCtrl', function($scope, $http, Users) {
  $scope.events = {};
  var token = "token " + window.localStorage.getItem("token");
  $http.get("https://api.github.com/events", {
    headers: {'Authorization': token}
  })
  .success(function(data, status, headers,config){
    $scope.events =  data;
  })
  .error(function(data, status, headers,config){
    console.log('data error');
  })
  .then(function(result){
  });
})
;
