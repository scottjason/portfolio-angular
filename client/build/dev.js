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

    console.log('### Run Block');

    var pathName = document.getElementById('pathName').innerHTML;
    $rootScope.redirectTo = pathName;
 
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

    $scope.getPlaceholder = function() {

      var isPortfolio = ($state.current.name === 'landing.portfolio');
      var isResume = ($state.current.name === 'landing.resume');
      var isAbout = ($state.current.name === 'landing.about');
      var isContact = ($state.current.name === 'landing.contact');

      if (isPortfolio) {
        return 'Portfolio';
      } else if (isResume) {
        return;
        return 'Resume';
      } else if (isAbout) {
        return 'About';
      } else {
        return 'Contact';
      }
    };

    $scope.reset = function(cb) {
      $scope.$parent.showPortfolio = false;
      $scope.$parent.showResume = false;
      $scope.$parent.showAbout = false;
      $scope.$parent.showContact = false;
      cb();
    }

    $scope.landingCtrl.toggleDropdown = function() {
      $scope.isOpen = !$scope.isOpen;
    };

    $scope.landingCtrl.optSelected = function(optSelected) {

      $window.scrollTo(0, 0);

      var isResume = (optSelected === 'Resume');
      if (isResume) {
        var url = 'https://dl.dropboxusercontent.com/u/7084808/Resume/Scott-Jason-Resume.pdf';
        window.open(url, '_blank');
        return;
      }


      var mapOpt = {
        'Portfolio': 'showPortfolio',
        'Contact': 'showContact'
      };

      $scope.reset(function() {

        var isPortfolio = (optSelected === 'Portfolio');
        var isContact = (optSelected === 'Contact');



        if (isPortfolio) {
          $scope.$parent[mapOpt[optSelected]] = true;
          $state.go('landing.portfolio');
        } else if (isContact) {
          $scope.$parent[mapOpt[optSelected]] = true;
          $state.go('landing.contact');
        }
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });
    };
  }
  controller.$inject = ['$scope', '$window', '$state'];
}


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
          console.log(scope);
        
        if (StateService.data['ContactForm'].name.isValid && StateService.data['ContactForm'].email.isValid && StateService.data['ContactForm'].message.isValid) {
          // $scope.showLoader = true;
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

  console.log('### Landing Controller');

  var ctrl = this;

  $scope.user = {};

  $scope.init = function(redirectTo) {
    var mapOpt = {
      'portfolio': 'showPortfolio',
      'contact': 'showContact'
    };

    if (redirectTo) {
      $scope[mapOpt[redirectTo]] = true;
      redirectTo = 'landing.' + redirectTo;
      $timeout(function() {
        $scope.fadeWelcome = true;
        $timeout(function() {
          $state.go(redirectTo);
        }, 50);
      });
    }
    $rootScope.redirectTo = null;
  }

  $scope.init($rootScope.redirectTo);


  var resetNavbar = function() {
    $scope.showPortfolio = false;
    $scope.showContact = false;
  }

  var resetState = function() {
    $scope.showPortfolio = false;
    $scope.showContact = false;
  }

  $rootScope.$on('dropdown:setFixed', function() {
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

  $rootScope.$on('showPortfolio', function() {
    resetNavbar();
    $scope.showPortfolio = true;
  });

  $rootScope.$on('showContact', function() {
    resetNavbar();
    $scope.showContact = true;
  });

  this.onWelcome = function() {
    resetState();
    $timeout(function() {
      $scope.fadeWelcome = true;
      $timeout(function() {
        $scope.showPortfolio = true;
        $state.go('landing.portfolio');
      }, 50);
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
    var mapOpt = {
      'Portfolio': 'showPortfolio',
      'Contact': 'showContact'
    };
    resetState();
    $state.go(state);
    console.log('condition', condition)
    $scope[mapOpt[condition]] = true;
  }

  ctrl.onSubmitContact = function(isValid) {
    $timeout(function() {
      if (isValid) {
        $scope.showLoader = true;
        RequestApi.sendMessage($scope.user).then(function(response) {
          $scope.showSent = true;

          $scope.showLoader = false;
          console.log('response', response);
        }, function(err) {
          console.log(err);
        });
      } else {
        console.log('render invalid input');
      }
    });
  };

  ctrl.downloadResume = function() {
    var url = 'https://dl.dropboxusercontent.com/u/7084808/Resume/Scott-Jason-Resume.pdf';
    window.open(url, '_blank');
  };


  LandingCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'StateService', 'RequestApi'];
}
