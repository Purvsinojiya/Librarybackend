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
  Image: {
    type: String,
    required: true,
  },
  Collage_id: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Create a model based on the schema
const issueBook = mongoose.model('issuebook', issuebookSchema);

module.exports = issueBook;
