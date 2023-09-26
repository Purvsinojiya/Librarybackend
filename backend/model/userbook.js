const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import the Schema object from mongoose

// Define the Userbook schema
const userbookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Signup', // Assuming 'Signup' is the name of your user model
    required: true,
  },
});

// Create a model based on the schema
const Userbook = mongoose.model('Userbook', userbookSchema);

module.exports = Userbook;
