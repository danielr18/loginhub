var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config')

var createJWT = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

module.exports = createJWT;
