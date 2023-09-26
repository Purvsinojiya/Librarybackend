const express = require('express');
const app = express();
const Book = require('../model/books');
const User = require('../model/Login');
const issuedbooks = require('../model/issuedbook');
const Login = require('../model/Login');
const Userbook = require('../model/userbook');
const Category = require('../model/categoris');

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
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const allcategerious= async (req, res, next) => {
    try {
      const users = await Category.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const addbooks = async (req, res, next) => {
    try {
      const { name, category, bookStatus } = req.body;
  
      // Assuming some kind of authentication/authorization check for admin role here
      // For simplicity, we're not implementing this in the example.
  
      const newBook = new Book({
        name,
        category,
        bookStatus,
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
        const { Cateagorys } = req.body;
        const category = new Category({Cateagorys});
        const savedCategory = await category.save();
        res.json(savedCategory);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create category' });
      }
    };

  const isubook = async (req, res, next) => {
    try {
        const { userId,name,category } = req.body;
    
        // Check if the book is available
        const book = await Book.findOne({ name: name });
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        if (book.bookStatus !== 'Available') {
          return res.status(400).json({ message: 'Book is not available for issuance' });
        }
    
        // Assuming some kind of user authentication/authorization check here
        // For simplicity, we're not implementing this in the example.
    
        // Create an issued book record
        const issuedBook = new issuedbooks({
        userId,
          name,
          category,
          issuedDate: new Date(),
        });
    
        // Update the book status to "Not Available"
        book.bookStatus = 'Not Available';
        await book.save();
    
        // Save the issued book record
        const savedIssuedBook = await issuedBook.save();

        const user = await Login.findByIdAndUpdate(userId);

        const userBook = new Userbook({
              name,
              category,
              userId
            });
            await userBook.save();
        
        res.status(201).json(savedIssuedBook);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };

    const returnbook = async (req, res, next) => {
        try {
          const { userId, name} = req.body;
      
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
          const userBook = await Userbook.deleteOne({ userId: userId, name: name });
      
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