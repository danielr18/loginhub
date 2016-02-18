//Angular Sign Up controller.
app.controller('SignupCtrl', function($scope, $location, $auth) {
  $scope.signup = function() {
        $auth.signup($scope.user)
          .then(function(response) {
            $auth.setToken(response);
            $location.path('/profile');
          })
          .catch(function(response) {

          });
      };
});
