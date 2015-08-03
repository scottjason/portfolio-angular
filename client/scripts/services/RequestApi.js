angular.module('Portfolio')
  .service('RequestApi', function($http) {

    'use strict'

    function sendMessage(params) {
      var request = $http({
        method: 'POST',
        url: '/',
        data: params
      });
      return (request.then(successHandler, errorHandler));
    }

    function successHandler(response) {
      return (response);
    }

    function errorHandler(response) {
      return (response);
    }

    return ({
      sendMessage: sendMessage,

    });
    RequestApi.$inject('$http');
  });
