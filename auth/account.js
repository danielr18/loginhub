//Account authorization basic configuration.
var mongoose = require('mongoose');
var User = require('../models/user');
var middleware = require('../middleware/middleware')
var createJWT = require('../token');
var express = require("express");

var authAccount = express.Router();

authAccount.post('/unlink', middleware.ensureAuthenticated, function(req, res) {
  var provider = req.body.provider;
  var providers = ['facebook', 'google', 'instagram', 'twitter'];

  if (providers.indexOf(provider) === -1) {
    return res.status(400).send({ message: 'Unknown OAuth Provider' });
  }

  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User Not Found' });
    }
    user[provider] = undefined;
    user.save(function() {
      res.status(200).end();
    });
  });
});

authAccount.get('/me', middleware.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

authAccount.put('/me', middleware.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});

module.exports=authAccount;
