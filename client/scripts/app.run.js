'use strict';

angular.module('Portfolio')
  .run(['$rootScope', '$window', '$state', function($rootScope, $window, $state) {

    console.log('### Run Block');

    var pathName = document.getElementById('pathName').innerHTML;
    $rootScope.redirectTo = pathName;
 
  }]);
