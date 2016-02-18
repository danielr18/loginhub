//Facebook authorization configuration.
var qs = require('qs');
var request = require('request');
var User = require('../models/user');
var express = require("express");
var jwt = require('jwt-simple');
var config = require('../config');
var createJWT = require('../token');

var facebookRoute = express.Router();

facebookRoute.post('/facebook', function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({
    url: accessTokenUrl,
    qs: params,
    json: true
  }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({
        message: accessToken.error.message
      });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({
      url: graphApiUrl,
      qs: accessToken,
      json: true
    }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({
          message: profile.error.message
        });
      }
      if (req.headers.authorization) {
        User.findOne({
          facebook: profile.id
        }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a Facebook account that belongs to you'
            });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({
                message: 'User not found'
              });
            }
            user.facebook = profile.id;
            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createJWT(user);
              res.send({
                token: token
              });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({
          facebook: profile.id
        }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            return res.send({
              message: "User gathered from DB",
              token: token
            });
          }
          var user = new User();
          user.facebook = profile.id;
          user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.displayName = profile.name;
          user.save(function() {
            var token = createJWT(user);
            res.send({
              message: "New user created in DB",
              token: token
            });
          });
        });
      }
    });
  });
});

module.exports = facebookRoute;
