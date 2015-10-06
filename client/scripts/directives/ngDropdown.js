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
      var isAbout = ($state.current.name === 'landing.about');
      var isContact = ($state.current.name === 'landing.contact');

      if (isPortfolio) {
        return 'Portfolio';
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
