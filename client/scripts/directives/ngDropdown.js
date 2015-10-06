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

      $scope.placeholder = optSelected;
      $window.scrollTo(0, 0);

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
