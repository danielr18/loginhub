//Angular profile controller.
app.controller('ProfileCtrl', function($scope, $auth, Account) {
  $scope.getProfile = function() {
        Account.getProfile()
            .then(function(response) {
                $scope.user = response.data;
            })
            .catch(function(response) {

            });
    };
    $scope.updateProfile = function() {
        Account.updateProfile($scope.user)
            .then(function() {

            })
            .catch(function(response) {

            });
    };
    $scope.link = function(provider) {
        $auth.link(provider)
            .then(function() {

                $scope.getProfile();
            })
            .catch(function(response) {

            });
    };
    $scope.unlink = function(provider) {
        $auth.unlink(provider)
            .then(function() {

                $scope.getProfile();
            })
            .catch(function(response) {

            });
    };
    $scope.getProfile();
});
