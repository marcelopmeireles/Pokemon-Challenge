describe('pokedexApi', function () {
	
	var currentPokemon;

	beforeEach(module('app'));

	beforeEach(inject(function() {
		var getPokedex = function(){};
		var getPokemonAsset = function(){};
		var setPokemon = function(){
			// currentPokemon = 'foo';
		};
	}));

	it('should be returned not null', function() {
		// expect(getPokedex).not.toBeNull();
		// expect(getPokemonAsset).not.toBeNull();
		// expect(setPokemon).not.toBeNull();
	});
});