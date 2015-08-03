'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout, $window, StateService, RequestApi) {

  var ctrl = this;

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

  $rootScope.$on('contact:submitForm', function(event, isValid) {
    ctrl.onSubmitContact(isValid);
  });

  this.onWelcome = function() {
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showPortfolio = true;
        $scope.fadeInTitle = true;
        $scope.fadeInLocation = true;
        $state.go('landing.portfolio');
      }, 120);
    });
  };

  this.onShareOpt = function(url) {
    $window.open(url);
  };

  this.onCompanySelected = function(url) {
    $window.open(url);
  };

  this.isValid = function(key) {
    return StateService.data['ContactForm'][key].isValid;
  };

  ctrl.onSubmitContact = function(isValid) {
    if (isValid) {
      RequestApi.sendMessage($scope.user).then(function(response) {
        console.log('response', response);
      }, function(err) {
        console.log(err);
      });
    } else {
      console.log('render invalid input');
    }
  };

  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'StateService', 'RequestApi'];
}
