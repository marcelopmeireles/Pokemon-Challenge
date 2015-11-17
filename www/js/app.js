var app = angular.module('app', ['ionic', 'angular-cache']);

app.run(function($ionicPlatform, CacheFactory, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // CacheFactory("pokedexCache", {storageMode: "localStorage", maxAge: 10000, deleteOnExpire: "agressive"});
    // CacheFactory("pokemonCache", {storageMode: "localStorage", maxAge: 10000, deleteOnExpire: "agressive"});

    Parse.initialize("KhlTe5udbx5ypPFMY6YS5m4UMZ2K6CS3AHIG9Nut", "XoYTU385fNT50EnUx7qBBAi3UWpZpwRCUayDfO51");
    var currentUser = Parse.User.current();
    $rootScope.user = null;
    $rootScope.isLoggedIn = false;

    if (currentUser) {
        $rootScope.user = currentUser;
        $rootScope.isLoggedIn = true;
        $state.go('login');
    }
  });
})