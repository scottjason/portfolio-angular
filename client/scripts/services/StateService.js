angular.module('Portfolio')
  .service('StateService', function() {

    'use strict'

    var data = {
      'ContactForm': {
        'name': {
          'isValid': false
        },
        'email': {
          'isValid': false
        },
        'message': {
          'isValid': false
        },
        'isValid': false
      }
    };

    return ({
      data: data,
    });
  });
