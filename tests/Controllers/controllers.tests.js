describe('app', function () {
	var scope;

	// beforeEach(module('app', ['ionic', 'angular-cache']));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('LoginCtrl', {$scope: scope});
	}));

	it('should be user null', function() {
		expect(scope.user.username).toBe(null);
		expect(scope.user.password).toBe(null);
	});
});