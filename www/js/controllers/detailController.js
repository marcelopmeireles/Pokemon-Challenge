(function () {
	'use strict';

	app.controller('detailCtrl',['pokedexApi', '$stateParams',  '$ionicModal', '$scope', detailCtrl]);

	function detailCtrl(pokedexApi, $stateParams,  $ionicModal, $scope){
		var vm = this;
		var api = 'http://pokeapi.co';
		// console.log($stateParams);
		$scope.sprite = $stateParams.sprite || null;
		$scope.template = '/images/template.png';

		// console.log($stateParams.pokemon);
		vm.pokemon = {
			name : $stateParams.name,
			resource_uri: $stateParams.resource_uri,
			sprites: $scope.sprite,
			attack : '',
			defense : '',
			sp_atk: '',
			sp_def: '',
			hp : '',
			exp : '',
			height : '',
			weight : '',
			speed : '',
			happiness : '',
			catch_rate : '',
			evolution : '',
			egg_cycles : '',
			egg_groups : '',
			abilities : '',
			descriptions: '',
			moves : ''
		};

		pokedexApi.getPokemonAsset(vm.pokemon.resource_uri).then(function(data){
            if (data.sprites[0] === undefined) {
                vm.pokemon.sprite = data.sprites.image;
            } else if ($stateParams.sprite === $scope.template) {
                vm.pokemon.sprites = data.sprites.image;       
            }
            
            var uri = vm.pokemon.resource_uri;
            pokedexApi.getPokemonAsset(uri).then(function(data2){
            	// console.log(data2);
                vm.pokemon.attack = data2.attack;
                vm.pokemon.defense = data2.defense;
                vm.pokemon.sp_atk = data2.sp_atk;
                vm.pokemon.sp_def = data2.sp_def;
                vm.pokemon.hp = data2.hp;
                vm.pokemon.exp = data2.exp;
                vm.pokemon.height = data2.height;
                vm.pokemon.weight = data2.weight;
                vm.pokemon.speed = data2.speed;
                vm.pokemon.happiness = data2.happiness;
                vm.pokemon.catch_rate = data2.catch_rate;
                vm.pokemon.evolution = data2.evolution;
                vm.pokemon.egg_cycles = data2.egg_cycles;
                vm.pokemon.egg_groups = data2.egg_groups;
                vm.pokemon.abilities = data2.abilities;
                vm.pokemon.descriptions = data2.descriptions;
                vm.pokemon.moves = data2.moves;

                var uri2;
                if (data2.sprites[0]) {
                	uri2 = data2.sprites[0].resource_uri;
                	// console.log("1: "+ uri2);
                } else if (data2.sprites.resource_uri) {
                	uri2 = api + '/' + data2.sprites.resource_uri;
                	// console.log("2: "+ uri2);
                } else if ($stateParams.resource_uri) {
                	uri2 = '/'+ $stateParams.resource_uri;
                	// console.log("3: "+ uri2);
                };

                pokedexApi.getPokemonAsset(uri2).then(function(data3){
                	// console.log("data3: ", data3);
                	if(data3.image) {
                		vm.pokemon.sprites = api + data3.image;
                	} else {
                		vm.pokemon.sprites = $stateParams.sprite;
                	}
                	$scope.bgimage = vm.pokemon.sprites;
                })
            });
			// console.log(vm.pokemon);      
        });

		$ionicModal.fromTemplateUrl('my-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function(title) {
			$scope.modal.show();
			$scope.title = title;
			vm.category = [];
			if (title == 'History') {
				vm.history = vm.pokemon.descriptions;
				vm.history.forEach(function(data){
					pokedexApi.getPokemonAsset(data.resource_uri).then(function(data2){
						return vm.category.push(data2.description);
					});
					$scope.category = vm.category.description;
				});
			} else if (title == 'Moves') {
				vm.moves = vm.pokemon.moves;
				vm.moves.forEach(function(data, index){
					pokedexApi.getPokemonAsset(data.resource_uri).then(function(data2){
						if(data2.moves !== null) {
							pokedexApi.getPokemonAsset(data2.resource_uri).then(function(data3){
								// console.log(data3);
								vm.category.push( { 'opened': false, 'name': data3.name, 'accuracy': data3.accuracy, 'description': data3.description } );
							});
						} else {
							vm.category.push({ 'name': data2.name, 'accuracy': data2.accuracy, 'description': data2.description });
						}
						return vm.category;
					});
				});
			}
		};
		$scope.closeModal = function() {
			$scope.modal.remove();
		};
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
		// Execute action
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
		// Execute action
		});

		$scope.toggleGroup = function(index) {
		    if ($scope.isGroupShown(index)) {
		      $scope.shownGroup = null;
		    } else {
		      $scope.shownGroup = vm.category[index];
		    }
		};
		
		$scope.isGroupShown = function(index) {
		    return $scope.shownGroup === vm.category[index];
		};
	};
})();