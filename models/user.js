//User schema.
var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    select: false
  },
  firstname: String,
  lastname: String,
  picture: String,
  facebook: String,
  twitter: String,
  verified: Boolean,
  verifyKey: Number
});

//Saving.
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

//Password comparation method.
userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
