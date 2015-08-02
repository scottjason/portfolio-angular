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

  function controller($scope, $window) {

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
  controller.$inject = ['$scope', '$window'];
}
