(function () {
    'use strict';
    
    app.controller('loginCtrl', function($scope, $rootScope, $stateParams, $state) {

    	if ($stateParams.clear) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        }

        if ($rootScope.isLoggedIn) {
            $state.go('main');
        }

        $scope.user = {
            username: null,
            password: null
        };

        $scope.error = {};

        $scope.login = function() {
            // $scope.loading = $ionicLoading.show({
            //     content: 'Logging in',
            //     animation: 'fade-in',
            //     showBackdrop: true,
            //     maxWidth: 200,
            //     showDelay: 0
            // });

            // var user = $scope.user;
            // Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
            //     success: function(user) {
            //         $ionicLoading.hide();
            //         $rootScope.user = user;
            //         $rootScope.isLoggedIn = true;
            //         $state.go('app.home', {
            //             clear: true
            //         });
            //     },
            //     error: function(user, err) {
            //         $ionicLoading.hide();
            //         // The login failed. Check error to see why.
            //         if (err.code === 101) {
            //             $scope.error.message = 'Invalid login credentials';
            //         } else {
            //             $scope.error.message = 'An unexpected error has ' +
            //                 'occurred, please try again.';
            //         }
            //         $scope.$apply();
            //     }
            // });

            $state.go('main');
        };

        $scope.signUp = function() {
            $state.go('register');
        };

        $scope.forgot = function() {
            $state.go('forgot');
        };
    })

})();