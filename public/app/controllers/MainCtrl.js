//Angular main controller.
var app = angular.module('LoginApp', ['ui.router', 'satellizer', 'ngMessages']);
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
//Routes configuration.
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'NavbarCtrl',
            templateUrl: 'app/views/home.html'
        })
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'app/views/login.html'
        })
        .state('logout', {
            url: '/logout',
            controller: 'LogoutCtrl'
        })
        .state('signup', {
            url: '/signup',
            controller: 'SignupCtrl',
            templateUrl: 'app/views/signup.html'
        })
        .state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl',
            templateUrl: 'app/views/profile.html'
        });

    $urlRouterProvider.otherwise('/');

//Satellizer config.
    $authProvider.httpInterceptor = true;
    $authProvider.tokenPrefix = "loginhub";
    $authProvider.facebook({
        clientId: '541848339317068'
    });
    $authProvider.twitter({
        url: '/auth/twitter'
    });
});


app.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
});

app.controller('LogoutCtrl', function($location, $auth) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        $location.path('/');
      });
  });
