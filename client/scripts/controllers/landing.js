'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout) {

  var ctrl = this;

  this.onWelcome = function() {
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showOverlay = true;
        $timeout(function() {
          $scope.fadeInTitle = true;
          $timeout(function() {
            $scope.fadeInLocation = true;
          }, 300);
        }, 700);
      }, 120);
    });
  };

  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout'];
}
