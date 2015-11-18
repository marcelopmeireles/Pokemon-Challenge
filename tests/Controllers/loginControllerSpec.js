describe('loginCtrl', function () {
	
	var $controllerConstructor;
	var scope;

	beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $state, $controller) {
		$controllerConstructor = $controller;
		scope = $rootScope.$new();
		spyOn($state, 'go');
		$state.go('main');
		$state.go('register');
		$state.go('forgot');
	}));

	it('should be user null', function() {
		scope.user = {
			username: null,
			password: null
		};
		expect(scope.user.username).toBe(null);
		expect(scope.user.password).toBe(null);
	});

	it('should be logged in', inject(function($state) {
		expect($state.go).toHaveBeenCalledWith('main');
	}));

	it('should be signed in', inject(function($state) {
		expect($state.go).toHaveBeenCalledWith('register');
	}));

	it('should be forgotten', inject(function($state) {
		expect($state.go).toHaveBeenCalledWith('forgot');
	}));
});