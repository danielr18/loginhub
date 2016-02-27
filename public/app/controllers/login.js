//Angular Log In controller.
app.controller('LoginCtrl', function($scope, $auth, $location, Account) {
  if ($auth.isAuthenticated()) { $location.path('/profile'); }
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(data) {
                console.log(data);
                $location.path('/profile');
            })
            .catch(function(error) {
                if (error) {
                }
            });
    };
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          $location.path('/profile');
        })
        .catch(function(error) {
            console.log(error);
        });
    };
    $scope.emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    //Taken from http://emailregex.com/
});
