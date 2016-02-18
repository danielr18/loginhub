//Angular Log In controller.
app.controller('LoginCtrl', function($scope, $auth, $location, Account) {
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(data) {
                console.log(data);
                $location.path('/profile');
            })
            .catch(function(error) {
                if (error) {
                    console.log(error);
                }
            });
    };
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          $location.path('/profile');
        })
        .catch(function(error) {

        });
    };
});
