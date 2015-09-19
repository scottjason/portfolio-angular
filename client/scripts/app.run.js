'use strict';

angular.module('Portfolio')
  .run(['$rootScope', '$window', '$state', function($rootScope, $window, $state) {

    console.log('### Run Block');


    
    var pathName = document.getElementById('pathName').innerHTML;
    $rootScope.redirectTo = pathName;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      /* Portfolio Back Button */
      // var isPortfolio = (fromState.name === 'landing.portfolio') && (toState.name === 'landing');
      // if (isPortfolio) {
      //   $rootScope.redirectTo = 'portfolio';
      // }

    });
  }]);
