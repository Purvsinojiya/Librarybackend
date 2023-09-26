const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Signup',
    required: true,
  },
  issuedBooks: 
    {
      type: String,
      ref: 'IssuedBook',
    },
  
});

const Login = mongoose.model('Login', LoginSchema);
module.exports = Login;
