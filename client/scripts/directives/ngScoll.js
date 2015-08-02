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
