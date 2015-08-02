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

  function controller($scope, $window) {

    $scope.dropdownOpts = [{
      'name': 'Portfolio'
    }, {
      'name': 'Resume'
    }, {
      'name': 'About'
    }, {
      'name': 'Contact'
    }];

    $scope.placeholder = 'Portfolio';

    $scope.reset = function(cb) {
      $scope.$parent.Portfolio = false;
      $scope.$parent.Resume = false;
      $scope.$parent.About = false;
      $scope.$parent.Contact = false;
      cb();
    }

    $scope.landingCtrl.toggleDropdown = function() {
      $scope.isOpen = !$scope.isOpen;
    };

    $scope.landingCtrl.optSelected = function(optSelected) {
      $window.scrollTo(0, 0);
      $scope.placeholder = optSelected;
      $scope.reset(function() {
        $scope.$parent[optSelected] = true;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });
    };
  }
  controller.$inject = ['$scope', '$window'];
}


angular
  .module('Portfolio')
  .directive('ngScroll', ngScroll);

function ngScroll($rootScope, $window) {
  var directive = {
    link: link
  };
  return directive;

  function link(scope, element, attr) {
    angular.element($window).bind("scroll", function() {
      if ($window.pageYOffset >= 90) {
        $rootScope.$broadcast('dropdown:setFixed');
      } else {
        $rootScope.$broadcast('dropdown:setAbsolute');
      }
    });
  };

  ngScroll.$inject = ['$rootScope', '$window'];
}


'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $timeout, $window) {

  $scope.user = {};

  $rootScope.$on('dropdown:setFixed', function() {
    console.log('on setFixed')
    $scope.fixDropdown = true;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  });

  $rootScope.$on('dropdown:setAbsolute', function() {
    $scope.fixDropdown = false;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  });

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

  LandingCtrl.$inject['$scope', '$rootScope', '$timeout', '$window'];
}
