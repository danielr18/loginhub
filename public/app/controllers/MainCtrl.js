var app = angular.module('LoginApp', ['ui.router', 'satellizer']);
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    //routes config
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'app/views/home.html'
        })
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'app/views/login.html'
        })
        .state('signup', {
            url: '/signup',
            controller: 'SignupCtrl',
            templateUrl: 'app/views/signup.html'
        });

    $urlRouterProvider.otherwise('/');

    //satellizer config
    $authProvider.httpInterceptor = true;
    $authProvider.tokenPrefix = "loginhub";
    $authProvider.facebook({
        clientId: '541848339317068'
    });
    $authProvider.twitter({
        url: '/auth/twitter'
    });
});

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
    $scope.getProfile = function() {
        Account.getProfile()
            .then(function(response) {
                $scope.user = response.data;
                console.log(response.data);
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
});
