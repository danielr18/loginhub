//require the Twilio module and create a REST client
var config = require('../config'); //Rename config.example to config
var client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

exports.sendSMS = function(data) {
    client.sendMessage({
        to: data.phone_number, // Any number Twilio can deliver to
        from: config.TWILIO_PHONE_NUMBER, // A number you bought from Twilio and can use for outbound communication
        body: 'Your LoginHub verification code is: ' + data.verification_code // body of the SMS message
    }, function(err, responseData) {
        if (!err) {
            console.log("SMS sent with Twilio");
        }
    });
};
