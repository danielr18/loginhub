//Token Creation Function
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.auth = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(), //Creation date.
    exp: moment().add(30, 'days').unix() //Expire date (can be changed to convenience).
  };
  return jwt.encode(payload, config.TOKEN_SECRET); //Returns token encrypted under base64.
};

//------------------------------------------------------------------------------
exports.verify = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(8, 'hours').unix(), //Expire date (can be changed to convenience).
  };
  return jwt.encode(payload, config.TOKEN_VERIFICATION_SECRET);
};

//------------------------------------------------------------------------------
exports.recovery = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(20, 'minutes').unix(), //Expire date (can be changed to convenience).
  };
  return jwt.encode(payload, config.TOKEN_PASSRECOVERY_SECRET);
};
