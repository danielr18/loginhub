// remember, directive name must start with a lower case & use camel case naming convetion
app.directive('validatePassword', function() {
  return {

    // limit usage to argument only
    restrict: 'A',

    // require NgModelController, i.e. require a controller of ngModel directive
    require: 'ngModel',

    // create linking function and pass in our NgModelController as a 4th argument
    link: function(scope, element, attr, ctrl) {

      // please note you can name your function & argument anything you like
      function customValidator(ngModelValue) {

        if (/[a-z]/.test(ngModelValue)) {
          ctrl.$setValidity('lowercase', true);
        } else {
          ctrl.$setValidity('lowercase', false);
        }

        // check if contains uppercase
        // if it does contain uppercase, set our custom `uppercaseValidator` to valid/true
        // otherwise set it to non-valid/false
        if (/[A-Z]/.test(ngModelValue)) {
          ctrl.$setValidity('uppercase', true);
        } else {
          ctrl.$setValidity('uppercase', false);
        }

        // check if contains number
        // if it does contain number, set our custom `numberValidator`  to valid/true
        // otherwise set it to non-valid/false
        if (/[0-9]/.test(ngModelValue)) {
          ctrl.$setValidity('digit', true);
        } else {
          ctrl.$setValidity('digit', false);
        }

        // check if the length of our input is exactly 6 characters
        // if it is 6, set our custom `sixCharactersValidator` to valid/true
        // othwise set it to non-valid/false
        if (ngModelValue.length >=8) {
          ctrl.$setValidity('minlength', true);
        } else {
          ctrl.$setValidity('minlength', false);
        }

        if (ngModelValue.length >= 128) {
          ctrl.$setValidity('maxlength', false);
        } else {
          ctrl.$setValidity('maxlength', true);
        }

        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%]{8,}$/.test(ngModelValue)) {
          ctrl.$setValidity('invalid', true);
        } else {
          ctrl.$setValidity('invalid', false);
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
