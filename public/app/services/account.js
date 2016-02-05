app.factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/auth/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/auth/me', profileData);
      }
    };
  });
