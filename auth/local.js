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
  User.findOne({
    email: req.body.email
  }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: "Email is already taken"
      });
    }
    if(!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(req.body.email)) {
      return res.status(422).send({
        message: 'Invalid email',
        error: "email"
      });
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%]{10,}$/.test(req.body.password)) {
      return res.status(422).send({
        message: 'Invalid password',
        error: "password"
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

//Sign Up configuration.
localAuth.post("/email_available", function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, existingUser) {
    if (existingUser) {
      return res.status(200).send({
        taken: true
      });
    }
    return res.status(200).send({
      taken: false
    });
  });
});

module.exports = localAuth;
