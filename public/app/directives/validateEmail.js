// remember, directive name must start with a lower case & use camel case naming convetion
app.directive('validateEmail', function($http) {
  return {

    // limit usage to argument only
    restrict: 'A',

    // require NgModelController, i.e. require a controller of ngModel directive
    require: 'ngModel',

    // create linking function and pass in our NgModelController as a 4th argument
    link: function(scope, element, attr, ctrl) {

      var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      //Taken from http://emailregex.com/
      // please note you can name your function & argument anything you like
      function customValidator(ngModelValue) {
        if(emailRegex.test(ngModelValue)) {
          ctrl.$setValidity('pattern', true);
          $http.post('/auth/email_available', {email: ngModelValue})
          .then(function(res) {
            if(res.data.taken) {
              ctrl.$setValidity('taken', false);
            }
            else {
              ctrl.$setValidity('taken', true);
            }
          });
        }
        else {
          ctrl.$setValidity('pattern', false);
        }
        // we need to return our ngModelValue, to be displayed to the user(value of the input)
        return ngModelValue;
      }

      // we need to add our customValidator function to an array of other(build-in or custom) functions
      // I have not notice any performance issues, but it would be worth investigating how much
      // effect does this have on the performance of the app
      ctrl.$parsers.push(customValidator);

    }
  };
});
