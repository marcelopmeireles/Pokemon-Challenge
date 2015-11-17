(function () {
    'use strict';

    app.config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
        
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'loginCtrl'
        })
        
        .state('register', {
          url: '/register',
          templateUrl: 'views/register.html',
          controller: 'loginCtrl'
        })

        .state('forgot', {
          url: '/forgot',
          templateUrl: 'views/forgot.html',
          controller: 'forgotCtrl'
        })

        .state('main', {
          url: '/main',
          templateUrl: 'views/main.html',
        })
            
        .state('detail', {
          url: '/detail/:name',
          params: {name: null, resource_uri: null, sprite: null },
          templateUrl: 'views/detail.html',
          controller: 'detailCtrl as vm'
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');

    });
})();