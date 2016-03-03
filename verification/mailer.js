var nodemailer = require('nodemailer');
var config = require('../config');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+config.LOGINHUB_EMAIL+'%40gmail.com:' +config.LOGINGUB_EMAIL_PASSWORD+'@smtp.gmail.com');

//Setting up pool configuration
var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: config.LOGINHUB_EMAIL,
        pass: config.LOGINHUB_EMAIL_PASSWORD
    }
};

exports.verificationEmail = function(data){
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'LoginHub Team <homeboxhoteltest@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: 'Welcome to LoginHub', // Subject line
      html: 'Hi ' + data.name + ', you have joined Loginhub almost completely! To verify your account, go to this link: <a href="http://localhost:8080/#/verify_email?token=' + escape(data.token) + "&key=" + escape(data.key) + '">Verify Email</a>'
    };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};

exports.passRecoveryEmail = function(data){
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'LoginHub Team <homeboxhoteltest@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: 'Loginhub password recovery', // Subject line
      html: 'Hi ' + data.name + ', you have requested a password recovery. To continue with the process, enter this link: <a href="http://localhost:8080/#/pass_recovery_res?token=' + escape(data.token) + "&key=" + escape(data.key) + '">Password Recovery</a>'
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};
