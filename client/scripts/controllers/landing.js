'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout, $window, StateService, RequestApi) {

  console.log('### Landing Controller');

  var ctrl = this;

  $scope.user = {};

  $scope.init = function(redirectTo) {
    var mapOpt = {
      'portfolio': 'showPortfolio',
      'contact': 'showContact',
      'about': 'showAbout'
    };

    if (redirectTo) {
      $scope[mapOpt[redirectTo]] = true;
      redirectTo = 'landing.' + redirectTo;
      $timeout(function() {
        $scope.fadeWelcome = true;
        $timeout(function() {
          $state.go(redirectTo);
        }, 50);
      });
    }
    $rootScope.redirectTo = null;
  }

  $scope.init($rootScope.redirectTo);


  var resetState = function() {
    $scope.showPortfolio = false;
    $scope.showContact = false;
    $scope.showAbout = false;
    $scope.showLoader = false;
    $scope.showSent = false;
  }

  $rootScope.$on('dropdown:setFixed', function() {
    if ($state.current.name !== 'landing.contact') {
      console.log($state.current.name)
      $scope.fixDropdown = true;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
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

  $rootScope.$on('showPortfolio', function() {
    resetState();
    $scope.showPortfolio = true;
  });

  $rootScope.$on('showContact', function() {
    resetState();
    $scope.showContact = true;
  });

  $rootScope.$on('showAbout', function() {
    resetState();
    $scope.showAbout = true;
  });

  this.onWelcome = function() {
    resetState();
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showPortfolio = true;
        $state.go('landing.portfolio');
      }, 50);
    });
  };

  this.onShareOpt = function(url) {
    $window.open(url);
  };

  this.onCompanySelected = function(url) {
    $window.open(url);
  };

  this.isValid = function(key) {
    console.log(key);
    return StateService.data['ContactForm'][key].isValid;
  };

  this.navigate = function(state, condition) {
    var mapOpt = {
      'Portfolio': 'showPortfolio',
      'Contact': 'showContact',
      'About': 'showAbout'
    };
    resetState();
    $state.go(state);
    console.log('condition', condition)
    $scope[mapOpt[condition]] = true;
  }

  ctrl.onSubmitContact = function(isValid) {
    $timeout(function() {
      if (isValid) {
        $scope.showLoader = true;
        RequestApi.sendMessage($scope.user).then(function(response) {
          $scope.showSent = true;
          $scope.showLoader = false;
        }, function(err) {
          console.log(err);
        });
      } else {
        $scope.showBadInput = true;
        $timeout(function() {
          $scope.showBadInput = false;
        }, 1500);
      }
    });
  };

  ctrl.downloadResume = function() {
    var url = 'https://dl.dropboxusercontent.com/u/7084808/Resume/Scott-Jason-Resume.pdf';
    window.open(url, '_blank');
  };

  ctrl.openLink = function(link) {
    window.open(link, '_blank');
  };


  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'StateService', 'RequestApi'];
}
