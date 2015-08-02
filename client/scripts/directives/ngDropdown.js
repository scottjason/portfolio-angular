angular
  .module('Portfolio')
  .directive('ngDropdown', ngDropdown);

function ngDropdown() {
  var directive = {
    link: link,
    controller: controller,
    bindToController: true,
    templateUrl: '/views/dropdown.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    element.bind('click', function(event) {
      console.log('clicked', event);
    })
  }

  function controller($scope) {
    $scope.landingCtrl.toggleDropDown = function() {
      $scope.isOpen = !$scope.isOpen;
    }
  }
  controller.$inject = ['$scope'];
}
