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

    $scope.dropdownOpts = [
      {'name': 'Portfolio'},
      {'name': 'Resume'},
      {'name': 'About'},
      {'name': 'Contact'}
    ];

    $scope.placeholder = 'Portfolio';

    $scope.landingCtrl.toggleDropdown = function() {
      $scope.isOpen = !$scope.isOpen;
    };

    $scope.landingCtrl.optSelected = function(optSelected) {
      $window.scrollTo(0, 0);
      $scope.placeholder = optSelected;
    };
  }
  controller.$inject = ['$scope', '$window'];
}
