'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout, $window, StateService, RequestApi) {

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
    $timeout(function() {
      $scope.user = {};
    });
  };

  $rootScope.$on('dropdown:setFixed', function() {
    if ($state.current.name !== 'landing.contact') {
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

  $rootScope.$on('showLanding', function(event) {
    $scope.fadeWelcome = false;
    resetState();
    $scope.init();
  });


  $rootScope.$on('showPortfolio', function() {
    $scope.fadeWelcome = true;
    resetState();
    $scope.showPortfolio = true;
  });

  $rootScope.$on('showContact', function() {
    $scope.fadeWelcome = true;
    resetState();
    $scope.showContact = true;
  });

  $rootScope.$on('showAbout', function() {
    $scope.fadeWelcome = true;
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
    return StateService.data['ContactForm'][key].isValid;
  };

  this.navigate = function(state, condition) {
    if (state === 'landing') {
      $scope.fadeWelcome = false;
    } else {
      $scope.fadeWelcome = true;
    }
    var mapOpt = {
      'Portfolio': 'showPortfolio',
      'Contact': 'showContact',
      'About': 'showAbout'
    };
    resetState();
    $state.go(state);
    if (state !== 'landing') {
      $scope[mapOpt[condition]] = true;
    }
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
