//Angular Verify email controller.
app.controller('VerifyEmailCtrl', function($scope, $location, $stateParams, Account) {
  if($stateParams.token && $stateParams.key) {
    Account.verifyEmail($stateParams)
    .then(function(response) {
        $scope.verification = response;
    })
    .catch(function(err) {
        $scope.verification = err;
    });
  }
  else {
    //404
  }
});
