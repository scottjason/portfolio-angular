'use strict';

angular.module('Portfolio')
  .run(['$rootScope', '$window', '$state', function($rootScope, $window, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'landing.portfolio') {
        $rootScope.$broadcast('isPortfolio');
      } else if (toState.name === 'landing.contact') {
        $rootScope.$broadcast('isContact');
      }
    });
  }]);
