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
