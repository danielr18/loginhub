//Angular Sign Up controller.
app.controller('SignupCtrl', function($scope, $location, $auth) {
  if ($auth.isAuthenticated()) { $location.path('/profile'); }
  $scope.signup = function(form) {
    $auth.signup($scope.user)
      .then(function(response) {
        $auth.setToken(response);
        $location.path('/profile');
      })
      .catch(function(response) {
          if(response.status===422) {
            if(response.data.error=="password") form.password.$setValidity("pattern", false);
            if(response.data.error=="email") form.email.$setValidity("pattern", false);
          }
          if(response.status===409) {
            form.email.$setValidity("taken", false);
          }
      });
  };
  $scope.emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  //Taken from http://emailregex.com/
});
