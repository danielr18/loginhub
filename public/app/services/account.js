app.factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/auth/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/auth/me', profileData);
      },
      verifyEmail: function(params) {
        return $http.get('/auth/verify_email?token='+escape(params.token)+'&key='+escape(params.key));
      }
    };
  });
