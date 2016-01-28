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
var authTwitter = require('./auth/twitter');
var authFacebook = require('./auth/facebook');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tester');
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

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.use('/auth', authTwitter, authFacebook);

app.get('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});

app.listen(port);

console.log("Listening on " + port);
