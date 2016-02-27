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
});
