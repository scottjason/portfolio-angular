'use strict';

angular.module('Portfolio')
  .controller('PortfolioCtrl', PortfolioCtrl);

function PortfolioCtrl($scope, $rootScope, $timeout, $window) {

  console.log("#### PortfolioCtrl");

  PortfolioCtrl.$inject['$scope', '$rootScope', '$timeout', '$window'];
}
