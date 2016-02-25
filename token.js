//Token Creation Function
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.authenticationCreateJWT = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(), //Creation date.
    exp: moment().add(30, 'days').unix() //Expire date (can be changed to convenience).
  };
  return jwt.encode(payload, config.TOKEN_SECRET); //Returns token encrypted under base64.
};

exports.verificationCreateJWT = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(), //Creation date.
    exp: moment().add(30, 'days').unix() //Expire date (can be changed to convenience).
  };
  return jwt.encode(payload, config.TOKEN_SECRET); //Returns token encrypted under base64.
};

exports.passChangeCreateJWT = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(), //Creation date.
    exp: moment().add(30, 'days').unix() //Expire date (can be changed to convenience).
  };
  return jwt.encode(payload, config.TOKEN_SECRET); //Returns token encrypted under base64.
};
