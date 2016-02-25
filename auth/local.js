//Email Log In and Sign Up.
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var User = require('../models/user');
var createJWT = require('../token');
var express = require("express");
var config = require('../config') //Rename config.example to config

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
        token: createJWT(user)
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
        token: createJWT(result)
      });
      var name = req.body.firstname;
      var from = "Loginhub";
      var message = "Se ha registrado en LoginHub, gracias por usar nuestros servicios";
      var to = req.body.email;
      var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
          user: config.LOGINHUB_EMAIL,
          pass: config.LOGINGUB_EMAIL_PASSWORD
        }
      });
      var mailOptions = {
        from: from,
        to: to,
        subject: name + ', bienvenido a Loginhub',
        text: message
      }
      smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error);
        }
      });
    });
  });
});

module.exports = localAuth;
