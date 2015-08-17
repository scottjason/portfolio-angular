'use strict';

angular
  .module('Portfolio', [
    'ui.router'
  ]);

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
      .state('landing.contact', {
        url: 'contact',
        templateUrl: 'views/includes/contact.html',
        controller: 'LandingCtrl as landingCtrl'
      })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });


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


angular
  .module('Portfolio')
  .directive('ngDropdown', ngDropdown);

function ngDropdown() {
  var directive = {
    controller: controller,
    bindToController: true,
    templateUrl: '/views/dropdown.html',
    restrict: 'EA'
  };
  return directive;

  function controller($scope, $window, $state) {

    $scope.dropdownOpts = [{
      'name': 'Portfolio'
    }, {
      'name': 'Resume'
    }, {
      'name': 'About'
    }, {
      'name': 'Contact'
    }];

    $scope.placeholder = 'Portfolio';

    $scope.reset = function(cb) {
      $scope.$parent.Portfolio = false;
      $scope.$parent.Resume = false;
      $scope.$parent.About = false;
      $scope.$parent.Contact = false;
      cb();
    }

    $scope.landingCtrl.toggleDropdown = function() {
      $scope.isOpen = !$scope.isOpen;
    };

    $scope.landingCtrl.optSelected = function(optSelected) {
      if (optSelected === 'Contact') $state.go('landing.contact');
      if (optSelected === 'Portfolio') $state.go('landing.portfolio');
      $window.scrollTo(0, 0);
      $scope.placeholder = optSelected;
      $scope.reset(function() {
        $scope.$parent[optSelected] = true;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });
    };
  }
  controller.$inject = ['$scope', '$window', '$state'];
}


angular
  .module('Portfolio')
  .directive('ngScroll', ngScroll);

function ngScroll($rootScope, $window) {
  var directive = {
    link: link
  };
  return directive;

  function link(scope, element, attr) {
    angular.element($window).bind("scroll", function() {
      if ($window.pageYOffset >= 90) {
        $rootScope.$broadcast('dropdown:setFixed');
      } else {
        $rootScope.$broadcast('dropdown:setAbsolute');
      }
    });
  };

  ngScroll.$inject = ['$rootScope', '$window'];
}


angular
  .module('Portfolio')
  .directive('ngValidate', ngValidate);

function ngValidate($rootScope, StateService) {
  var directive = {
    link: link
  };
  return directive;

  function validateEmail(email) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
  }

  function link(scope, element, attr) {
    element.bind('keydown keypress click', function($event) {

      var isSubmitBtn = ($event.target.id === 'submit-btn' || $event.target.id === 'submit-btn-copy');

      var modelName = scope.$parent.user.name;
      var modelEmail = scope.$parent.user.email;
      var modelMessage = scope.$parent.user.message;

      var isValid = validateEmail(modelEmail);

      StateService.data['ContactForm'].name.isValid = (modelName && modelName.length) ? true : false;
      StateService.data['ContactForm'].email.isValid = isValid ? true : false;
      StateService.data['ContactForm'].message.isValid = (modelMessage && modelMessage.length) ? true : false;

      if (isSubmitBtn) {
        if (StateService.data['ContactForm'].name.isValid && StateService.data['ContactForm'].email.isValid && StateService.data['ContactForm'].message.isValid) {
          $rootScope.$broadcast('contact:submitForm', true);
        } else {
          $rootScope.$broadcast('contact:submitForm', false);
        }
      }
    });
  };
  ngValidate.$inject = ['$rootScope', 'StateService'];
}


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


'use strict';

angular.module('Portfolio')
  .controller('LandingCtrl', LandingCtrl);

function LandingCtrl($scope, $rootScope, $state, $timeout, $window, StateService, RequestApi) {

  var ctrl = this;

  $scope.user = {};

  var resetNavbar = function() {
    $scope.isPortfolio = false;
    $scope.isContact = false;
  }

  var resetState = function() {
    $scope.Portfolio = false;
    $scope.Contact = false;
  }

  $rootScope.$on('dropdown:setFixed', function() {
    console.log('on setFixed')
    $scope.fixDropdown = true;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  });

  $rootScope.$on('dropdown:setAbsolute', function() {
    $scope.fixDropdown = false;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  });

  $rootScope.$on('contact:submitForm', function(event, isValid) {
    ctrl.onSubmitContact(isValid);
  });

  $rootScope.$on('isPortfolio', function() {
    resetNavbar();
    $scope.isPortfolio = true;
  });

  $rootScope.$on('isContact', function() {
    resetNavbar();
    $scope.isContact = true;
  });

  this.onWelcome = function() {
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showPortfolio = true;
        $state.go('landing.portfolio');
      }, 120);
    });
  };

  this.onShareOpt = function(url) {
    $window.open(url);
  };

  this.onCompanySelected = function(url) {
    $window.open(url);
  };

  this.isValid = function(key) {
    return StateService.data['ContactForm'][key].isValid;
  };

  this.navigate = function(state, condition) {
    resetState();
    $state.go(state);
    $scope[condition] = true;
  }

  ctrl.onSubmitContact = function(isValid) {
    if (isValid) {
      RequestApi.sendMessage($scope.user).then(function(response) {
        console.log('response', response);
      }, function(err) {
        console.log(err);
      });
    } else {
      console.log('render invalid input');
    }
  };

  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'StateService', 'RequestApi'];
}
