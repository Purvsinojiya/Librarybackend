const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignupSchema = new Schema({
  Fullname: {
    type: String,
    required: true,
  },
  Mobilenumber: {
    type: Number,
    required: true,
    minlength: 6,
  },
  EmailID: {
    type: String,
    required: true,
    minlength: 6,
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
  },
  ConfirmPassword: {
    type: String,
    required: true,
    minlength: 6,
  }

});

const Signup = mongoose.model('Signup', SignupSchema);
module.exports = Signup;
