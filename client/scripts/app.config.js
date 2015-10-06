'use strict';

angular.module('Portfolio')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html',
        controller: 'LandingCtrl as landingCtrl'
      })
      .state('landing.portfolio', {
        url: 'portfolio',
        templateUrl: 'views/includes/portfolio.html',
        controller: 'LandingCtrl as landingCtrl'
      })
      .state('landing.about', {
        url: 'about',
        templateUrl: 'views/includes/about.html',
        controller: 'LandingCtrl as landingCtrl'
      })
      .state('landing.contact', {
        url: 'contact',
        templateUrl: 'views/includes/contact.html',
        controller: 'LandingCtrl as landingCtrl'
      })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
