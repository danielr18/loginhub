//Main Server
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var port = process.env.PORT || 8080;
var path = require('path');
var authTwitter = require('./auth/twitter');
var authAccount = require('./auth/account');
var authFacebook = require('./auth/facebook');
var authLocal = require('./auth/local');
var mongoose = require('mongoose');
var moment = require('moment');
var config = require('./config') //Rename config.example to config

//Connection to database
mongoose.connect(config.DATABASE_URL);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

//Routing basic configuration.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
  next();
});
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(__dirname + '/public'));

//Stablishing homepage.
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

//???
app.use('/auth', authLocal, authTwitter, authFacebook, authAccount);

//PROFIT.

//Testing basic configuration.
app.listen(port);
console.log("Listening on " + port);
