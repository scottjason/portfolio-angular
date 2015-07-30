'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout) {

  var ctrl = this;

  this.initialize = function() {
    $timeout(function() {
      $scope.fadeTitle = true;
      $timeout(function(){
      	// $scope.translateUp = true;
      }, 1000);
    }, 100);
  };


  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout'];
}
