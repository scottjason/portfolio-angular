'use strict';

angular.module('Portfolio')
  .run(['$rootScope', '$window', '$state', '$location', function($rootScope, $window, $state, $location) {

    console.log('### Run Block');

    var pathName = document.getElementById('pathName').innerHTML;
    $rootScope.redirectTo = pathName;

    $rootScope.$on('$locationChangeSuccess', function() {
      $rootScope.currentLocation = $location.path();
    });

    $rootScope.$watch(function() {
      return $location.path()
    }, function(newLocation, oldLocation) {
      if ($rootScope.currentLocation === newLocation) {
        var isLanding = (newLocation === '/');
        var isPortfolio = (newLocation === '/portfolio');
        var isAbout = (newLocation === '/about');
        var isContact = (newLocation === '/contact');
        if (isLanding) {
          $rootScope.$broadcast('showLanding');
        } else if (isPortfolio) {
          $rootScope.$broadcast('showPortfolio');
        } else if (isAbout) {
          $rootScope.$broadcast('showAbout');
        } else if (isContact) {
          $rootScope.$broadcast('showContact');
        } else {
          $rootScope.$broadcast('showLanding');
        }
      }
    });
  }]);
