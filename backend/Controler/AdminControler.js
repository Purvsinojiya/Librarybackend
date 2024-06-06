const express = require('express');
const app = express();
const Book = require('../model/books');
const User = require('../model/Login');
const issuedbooks = require('../model/issuedbook');
const Login = require('../model/Login');
const Userbook = require('../model/userbook');
const Category = require('../model/categoris');
const Signup = require('../model/Signup');

const getallbooks = async (req, res, next) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const allisuuedbook = async (req, res, next) => {
    try {
      const books = await issuedbooks.find();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const getalluser = async (req, res, next) => {
    try {
      const users = await Signup.find();
  
      // Fetch issued books for each user
      const usersWithIssuedBooks = await Promise.all(users.map(async (user) => {
        const issuedBooks = await issuedbooks.find({ Collage_id: user.Collage_id });
        return {
          ...user._doc,
          issuedBooks,
        };
      }));
  
      res.json(usersWithIssuedBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const allcategerious = async (req, res, next) => {
    try {
      // Use distinct() to get unique categories
      const distinctCategories = await Category.distinct('category');
  
      if (distinctCategories.length === 0) {
        return res.status(204).json({ message: 'No categories found' });
      }
  
      res.json(distinctCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const addbooks = async (req, res, next) => {
    try {
      const { name, category, bookStatus,Image } = req.body;
  
      // Assuming some kind of authentication/authorization check for admin role here
      // For simplicity, we're not implementing this in the example.
  
      const newBook = new Book({
        name,
        category,
        bookStatus,
        Image
      });

      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const addcategerios = async (req, res, next) => {
    try {
      const { category } = req.body;
      const newCategory = new Category({ category });
      const savedCategory = await newCategory.save();
      res.json(savedCategory);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create category' });
    }
  };

    const isubook = async (req, res, next) => {
      try {
        const { Collage_id, name, category } = req.body;
    
        // Check if the book is available
        const book = await Book.findOne({ name: name });
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        if (book.bookStatus !== 'Available') {
          return res.status(400).json({ message: 'Book is not available for issuance' });
        }
    
        // Create an issued book record
        const issuedBook = new issuedbooks({
          Collage_id,
          name,
          category,
          Image: book.Image, // Store the image URL from the book database
          issuedDate: new Date(),
        });
    
        // Update the book status to "Not Available"
        book.bookStatus = 'Not Available';
        await book.save();
    
        // Save the issued book record
        const savedIssuedBook = await issuedBook.save();
    
        // Find the user by Collage_id (which is a string)
        const user = await Signup.findOne({ Collage_id: Collage_id });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Create a user book record
        const userBook = new Userbook({
          name,
          category,
          Collage_id,
        });
        await userBook.save();
    
        res.status(201).json(savedIssuedBook);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
    
    module.exports = { isubook };
    
    

    const returnbook = async (req, res, next) => {
      try {
        const { Collage_id, name } = req.body;
    
        // Check if the book is available
        const book = await Book.findOne({ name: name });
    
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        if (book.bookStatus !== 'Not Available') {
          return res.status(400).json({ message: 'Book is already available' });
        }
    
        // Assuming some kind of user authentication/authorization check here
        // For simplicity, we're not implementing this in the example.
    
        // Update the book status to "Available"
        book.bookStatus = 'Available';
        await book.save();
    
        // Find and update the user's book record
        const userBook = await Userbook.deleteOne({ Collage_id: Collage_id, name: name });
        const issuedBook = await issuedbooks.deleteOne({ Collage_id: Collage_id, name: name });
        if (!userBook) {
          return res.status(404).json({ message: 'Userbook record not found' });
        }
    
        res.status(200).json({ message: 'Book returned successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
    

  module.exports = {getallbooks,getalluser,addbooks,isubook,allisuuedbook,addcategerios,allcategerious,returnbook};