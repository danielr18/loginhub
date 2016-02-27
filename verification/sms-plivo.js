//require the Twilio module and create a REST client
var config = require('../config'); //Rename config.example to config
var plivo = require('plivo').RestAPI({
  authId: config.PLIVO_AUTH_ID,
  authToken: config.PLIVO_AUTH_TOKEN
});

exports.sendSMS = function(data) {
    plivo.send_message({
        src: config.PLIVO_PHONE_NUMBER,
        dst: data.phone_number, 
        text: 'Your LoginHub verification code is: ' + data.verification_code // body of the SMS message
    }, function(status, response) {
      console.log('Status: ', status);
      console.log('API Response:\n', response);
    });
};
