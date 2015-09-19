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

          $scope.onLogout = function() {
              $rootScope.isLogout = true;
              var isRequesting = $rootScope.isRequesting;
              if (isRequesting) {
                isReady();
              } else {
                onReady();
              }

              function isReady() {
                var isRequesting = $rootScope.isRequesting;
                if (isRequesting) {
                  $timeout(isReady, 200);
                } else {
                  $rootScope.isLogout = null;
                  onReady();
                }
              }

              function onReady() {
                localStorageService.clearAll();
                isAuthorized = null;
                localStorageService.set('isRedirect', true);
                RequestApi.onLogout().then(function() {
                  window.location.href = window.location.protocol + '//' + window.location.host;
                })
              }
          }
        }
      ],
    }
    return directive;
  });