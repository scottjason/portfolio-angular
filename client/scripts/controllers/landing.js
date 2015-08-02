'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout, $window) {

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
        // $timeout(function() {
          $scope.fadeInTitle = true;
        //   $timeout(function() {
            $scope.fadeInLocation = true;
        $state.go('landing.portfolio');
            
        //   }, 300);
        // }, 700);
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
