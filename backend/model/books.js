const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
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
});

// Create a model based on the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
