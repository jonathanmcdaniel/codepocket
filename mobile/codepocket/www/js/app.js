var imports = [];
imports.push("ionic");
imports.push("ngCordovaOauth");
imports.push("CodePocket.MenuCtrl");
imports.push("CodePocket.Authentication");
imports.push("CodePocket.Users");


angular.module('CodePocket', imports)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    },
    cache: false
  })
  .state('app.repos', {
    url: '/repos',
    views: {
      'menuContent': {
        templateUrl: 'templates/repos.html',
        controller: 'ReposCtrl'
      }
    },
    cache: false
  })
  .state('app.repos.detail', {
    url: '/repos/:path*',
    views: {
      'menuContent': {
        templateUrl: 'templates/repos.html',
        controller: 'ReposCtrl'
      }
    },
    cache: false
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    },
    cache: false
  })
  .state('app.events', {
    url: '/profile/events',
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html',
        controller: 'ProfileEventsCtrl'
      }
    },
    cache: false
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
