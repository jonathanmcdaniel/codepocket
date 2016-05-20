angular.module('CodePocket.Authentication', [])
.factory('Authentication', function($cordovaOauth) {
  return {
    request: function () {
      if (window.cordova){
        $cordovaOauth.github("f85b3f5709b37fd31087", "cb9adbcca15fcf41c0cf2a6c6ff1a53ed5b8e542", ["user"], {}).then(function(result) {
          var items = result.split("&");
          var access = items[0];
          var token = access.split("=")[1];
          window.localStorage.setItem("token", token);
        }, function(error) {
          console.log("Error -> " + error);
        });
      }
    }
  };
});
