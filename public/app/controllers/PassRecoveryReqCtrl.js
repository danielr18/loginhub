app.controller('ResetPasswordCtrl', ['$scope', '$location', 'UserService',
      function ResetPasswordCtrl($scope, $location, UserService) {
        // action handler for ng-click on form
            $scope.resetPassword = function() {
                UserService.resetPassword({email: $scope.resetPasswordEmail}, $scope.successHandlerResetPassword, $scope.errorHandler);
            };
            $scope.errorHandler = function(error) {
                  console.log(error);
                  $location.path('/error');
            };
        $scope.successHandlerResetPassword = function(httpResponse) {
              console.log('SUCCESS!');
              $location.path('/home');
        };
    }]);
