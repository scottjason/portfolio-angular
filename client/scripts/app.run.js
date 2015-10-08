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
        	$rootScope.redirectTo = 'landing';
        } else if (isPortfolio) {
        	$rootScope.redirectTo = 'portfolio';

        }
      }
    });
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //   var map = {
    //     'landing': 'landing',
    //     'landing.portfolio': 'portfolio',
    //     'landing.about': 'about',
    //     'landing.contact': 'contact'
    //   };
    //   console.log('toState', toState)
    //     $rootScope.redirectTo = map[toState.name];
    // });

  }]);
