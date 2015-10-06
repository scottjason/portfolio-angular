angular.module('Portfolio')
  .directive('ngPortfolio', function() {

    'use strict';

    var directive = {
      restrict: 'A',
      scope: {
        onLogout: '='
      },
      link: function(scope, element, attrs) {},
      templateUrl: 'views/portfolio.html',
      controller: ['$scope', '$rootScope', '$timeout', '$state', '$window', 'RequestApi', 'localStorageService',
        function($scope, $rootScope, $timeout, $state, $window, RequestApi, localStorageService) {

          console.log('### ngPortfolio.js');

        }
      ],
    }
    return directive;
  });
