var mongoose = require("mongoose");


// Default user schema
var userSchema = new mongoose.Schema({
  name: {
    trim: true,
    type: String
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    required: true
  }
});

// User model
var User = mongoose.model('User', userSchema);

// Validations
User.schema.path('email').validate(function (value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
}, 'Invalid email');


exports = module.exports = User;

