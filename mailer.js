var nodemailer = require('nodemailer');
var config = require('./config');
var generatedLink = require('./token');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+config.LOGINHUB_EMAIL+'%40gmail.com:'
+config.LOGINGUB_EMAIL_PASSWORD+'@smtp.gmail.com');

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
      text: 'You have joined Loginhub almost completely! To verify your account, enter this link:http//localhost:8080' + generatedLink.verificationCreateJWT, // plaintext body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}

exports.passRecoveryEmail = function(data){
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'LoginHub Team <homeboxhoteltest@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: 'Loginhub password recovery', // Subject line
      text: 'Enter this link: ' + generatedLink, // plaintext body
      html: '<b>Hello world</b>' // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
