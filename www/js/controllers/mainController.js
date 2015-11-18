(function () {
    'use strict';

    app.controller('mainCtrl', ['pokedexApi', '$scope', '$rootScope', '$state', '$stateParams', mainCtrl]);

    function mainCtrl(pokedexApi, $scope, $rootScope, $state, $stateParams) {
        var vm = this;

        $scope.template = '/images/template.png';
        $scope.loading = '/images/loading.gif';
        var api = 'http://pokeapi.co';

    	if ($stateParams.clear) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        }
        
        $rootScope.fields = {
            search: ''
        }

        pokedexApi.getPokedex().then(function(data){
            data = _.sortByOrder(data.pokemon, ['name'], ['asc']);
            vm.pokemon = data;
            vm.pokemon.forEach(function(data){
                var image;
                data.sprite = $scope.loading;
                pokedexApi.getPokemonAsset(data.resource_uri).then(function(data2){
                    if (data2.sprites === []) {
                        return data.sprite = $scope.template;
                    } else if (data2.sprites[0] === undefined) {
                        return data.sprite = $scope.template;
                    } else {
                        var uri = data2.sprites[0].resource_uri;
                        pokedexApi.getPokemonAsset(uri).then(function(data3){
                            var image;
                            image = api + data3.image;
                            return data.sprite = image;
                        });
                    };
                });
            });
        });
        
        vm.choosePokemon = function(index) {
            $state.go('detail' , {
                                    name: vm.pokemon[index].name,
                                    resource_uri: vm.pokemon[index].resource_uri,
                                    sprite: vm.pokemon[index].sprite
                                });
        };

        // $scope.firstLetter = function (name) {
        //   return name && name.charAt(0);
        // }

        // $scope.lastPokemon = function (index) {
        //     if (index != 0) {
        //         index--;
        //     };
        //     var name = pokemon[index].name;
        //     return name && name.charAt(0);
        // }

        $scope.logout = function() {
            Parse.User.logOut();
            $rootScope.user = null;
            $rootScope.isLoggedIn = false;
            $state.go('login', {
                clear: true
            });
        };
    };

})();