var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var User = require('./models/user');
var morgan = require('morgan');
var cors = require('cors');
var jwt = require('jwt-simple');
var config = require('./config');
var moment = require('moment');
var port = process.env.PORT || 8080;
var path = require('path');
var middleware = require('./middleware/middleware')
var token = require('./token')
var authTwitter = require('./auth/twitter');
var authAccount = require('./auth/account');
var authFacebook = require('./auth/facebook');
var authLocal = require('./auth/local');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@apollo.modulusmongo.net:27017/wyjoPo8d');
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

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

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.use('/auth', authLocal, authTwitter, authFacebook, authAccount);

app.listen(port);

console.log("Listening on " + port);
