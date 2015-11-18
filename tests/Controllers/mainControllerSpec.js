describe('mainCtrl', function () {
	
	var $controllerConstructor;
	var scope;
	var api;
	var vm;

	beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $state, $controller) {
		$controllerConstructor = $controller;
		scope = $rootScope.$new();
		scope.fields = { search: 'foo'} ;
		spyOn($state, 'go');
		$state.go('login', {clear: true});
	}));

	it('should be template image not null', function() {
		expect(scope.template).not.toBeNull();
	});

	it('should be loading image not null', function() {
		expect(scope.loading).not.toBeNull();
	});

	it('should be api path not null', function() {
		expect(api).not.toBeNull();
	});

	it('should be field searched string', function() {
		expect(scope.fields.search).toBe('foo');
	})


	it('should be logged out', inject(function($state) {
		expect($state.go).toHaveBeenCalledWith('login', {clear: true});
	}));
});