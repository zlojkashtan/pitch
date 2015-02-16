angular.module('app', ['ionic', 'ionic.contrib.icon', 'ngResource', 'LocalStorageModule', 'ngCachedResource', 'ngCordova', 'leaflet-directive'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready( function() {
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.navigator && window.navigator.splashscreen) {
      // Manually hide splash screen (fix for white screen)
      navigator.splashscreen.hide();
    }
  });
})

// Configure default loading
.constant('$ionicLoadingConfig', {
  template: '<img style="75px;" class="animate-loading" src="img/pitch.png" />'
})

.config(function ($stateProvider, $urlRouterProvider, $cordovaFacebookProvider, $httpProvider, localStorageServiceProvider) {

  // Configure local storage
  localStorageServiceProvider.setPrefix('pitch');

  // Attach interceptor
  $httpProvider.interceptors.push('HttpInterceptor');

  // Configure Facebook API for development
  if (!window.cordova) {
    $cordovaFacebookProvider.browserInit(839167686141518);
  }

  // Configure states
  $stateProvider

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('join', {
    url: '/join',
    templateUrl: 'templates/join.html',
    controller: 'JoinCtrl'
  })

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabsCtrl'
  })

  .state('tab.featured', {
    url: '/featured',
    views: {
      'tab-featured': {
        templateUrl: 'templates/tabs/featured.html',
        controller: 'FeaturedCtrl'
      }
    }
  })

  .state('tab.featured-details', {
    url: '/featured/:id',
    views: {
      'tab-featured': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })

  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tabs/favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.favorites-details', {
    url: '/favorites/:id',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tabs/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.search-details', {
    url: '/search/:id',
    views: {
      'tab-search': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })

  .state('tab.pitch', {
    url: '/pitch',
    views: {
      'tab-pitch': {
        templateUrl: 'templates/tabs/pitch/create.html',
        controller: 'PitchCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tabs/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.profile-details', {
    url: '/profile/:id',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
