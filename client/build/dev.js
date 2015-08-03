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
    $stateProvider
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
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {});
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
    element.bind('keydown click', function($event) {
      console.log($event)

      var isName = ($event.target.id === 'user-name');
      var isEmail = ($event.target.id === 'user-email');
      var isMessage = ($event.target.id === 'user-message');
      var isSubmitBtn = ($event.target.id === 'submit-btn' || $event.target.id === 'submit-btn-copy');

      var modelName = scope.$parent.user.name;
      var modelEmail = scope.$parent.user.email;
      var modelMessage = scope.$parent.user.message;

      if (isName) {
        StateService.data['ContactForm'].name.isValid = (modelName && modelName.length) ? true : false;
      }
      if (isEmail) {
        var isValid = validateEmail(modelEmail);
        StateService.data['ContactForm'].email.isValid = isValid ? true : false;
      }
      if (isMessage) {
        StateService.data['ContactForm'].message.isValid = (modelMessage && modelMessage.length) ? true : false;
      }
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

function LandingCtrl($scope, $rootScope, $state, $timeout, $window, StateService) {

  var ctrl = this;

  $scope.user = {};

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

  this.onWelcome = function() {
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showPortfolio = true;
        $scope.fadeInTitle = true;
        $scope.fadeInLocation = true;
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

  ctrl.onSubmitContact = function(isValid) {
    console.log('on onSubmitContact ctrl', isValid);
  };

  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'StateService'];
}
