'use strict';

angular.module('BoilerPlate')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout) {

  var ctrl = this;

  this.initialize = function() {
    ctrl.welcomeUser();
  };

  ctrl.welcomeUser = function() {
    console.log("Welcome User!");
  };


  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout'];
}
