angular.module('CodePocket.Users', [])
.factory('Users', function($cordovaOauth, $http) {

  var accountUser = {};

  return {
    get: function () {
      return accountUser;
    },
    set: function(user){
      accountUser = user;
    }
  };
});
