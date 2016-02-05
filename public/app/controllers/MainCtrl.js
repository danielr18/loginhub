var app = angular.module('LoginApp', ['ui.router', 'satellizer']);
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    //routes config
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
