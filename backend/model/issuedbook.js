const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import the Schema object from mongoose

// Define the Book schema
const issuebookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bookStatus: {
    type: String,
    enum: ['Available', 'Not Available'],
    default: 'Available', // Default status is "Available"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Signup', // Assuming 'Signup' is the name of your user model
    required: true,
  },
});

// Create a model based on the schema
const issueBook = mongoose.model('issuebook', issuebookSchema);

module.exports = issueBook;
