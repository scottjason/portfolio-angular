'use strict';

angular
  .module('Portfolio', [
    'ui.router'
  ]);

'use strict';

angular.module('Portfolio')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html',
        controller: 'LandingCtrl as landingCtrl'
      })
    $stateProvider
      .state('interface', {
        templateUrl: 'views/interface.html',
        controller: 'LandingCtrl as landingCtrl'
      })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });


angular
  .module('Portfolio')
  .directive('ngDropdown', ngDropdown);

function ngDropdown() {
  var directive = {
    controller: controller,
    bindToController: true,
    templateUrl: '/views/dropdown.html',
    restrict: 'EA'
  };
  return directive;

  function controller($scope) {

    $scope.dropdownOpts = [
      {'name': 'Portfolio'},
      {'name': 'Resume'},
      {'name': 'About'},
      {'name': 'Contact'}
    ];

    $scope.placeholder = 'Portfolio';

    $scope.landingCtrl.toggleDropdown = function() {
      $scope.isOpen = !$scope.isOpen;
    };

    $scope.landingCtrl.optSelected = function(optSelected) {
      $scope.placeholder = optSelected;
    };
  }
  controller.$inject = ['$scope'];
}


'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout, $window) {

  var ctrl = this;

  this.onWelcome = function() {
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showPortfolio = true;
        $timeout(function() {
          $scope.fadeInTitle = true;
          $timeout(function() {
            $scope.fadeInLocation = true;
          }, 300);
        }, 700);
      }, 120);
    });
  };

  this.onShareOpt = function(url) {
    $window.open(url);
  };

  this.onCompanySelected = function(url) {
    $window.open(url);
  };

  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window'];
}
