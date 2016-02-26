//Email Log In and Sign Up.
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var User = require('../models/user');
var createJWT = require('../token');
var express = require("express");
var mailer = require('../mailer');
var config = require('../config'); //Rename config.example to config

var localAuth = express.Router();

//Log In configuration.
localAuth.post("/login", function(req, res) {
  User.findOne({
    email: req.body.email
  }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({
        message: 'Invalid email and/or password'
      });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({
          message: 'Invalid email and/or password'
        });
      }
      res.send({
        token: createJWT.verify(user)
      });
    });
  });
});

//Sign Up configuration.
localAuth.post("/signup", function(req, res) {
  console.log(req.body);
  User.findOne({
    email: req.body.email
  }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: 'Email is already taken'
      });
    }
    var user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      ID: req.body.ID
    });
    user.save(function(err, result) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      }
      res.send({
        token: createJWT.auth(result)
      });
      mailer.verificationEmail({
        name: req.body.firstname,
        email: req.body.email
      });
    });
  });
});

module.exports = localAuth;
