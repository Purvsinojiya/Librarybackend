const express = require('express');
const app = express();
const Signups = require('../model/Signup.js');
const Login = require('../model/Login.js');
const Book = require('../model/books');
const Userbook = require('../model/userbook');
const issuedbooksss = require('../model/issuedbook');
const signup = async (req, res, next) => {
    const {Fullname, Mobilenumber, EmailID, Password,Collage_id } = req.body;
     
    if (!Fullname || !Mobilenumber || !EmailID || !Password ||!Collage_id) {
    return res.status(400).json({ message: 'Please provide all the required fields' });
    }
    
  
    const user = await Signups.create({ Fullname, Mobilenumber, EmailID, Password,Collage_id });
    
    
    
    // Save the user data in the database using the appropriate method provided by your ORM or model library
    
    // Assuming you're using Mongoose
    await user.save();
    
    return res.status(200).json({ message: 'successful signup' });
    };

    const login = async (req, res, next) => {
       // Replace with your own secret key
     
        const { EmailID, Password } = req.body; // Assuming "name" is used for username
      
        if (!EmailID || !Password) {
          return res.status(400).json({ message: 'Please provide the name and password' });
        }
      
        try {
          if (EmailID === 'admin@gmail.com' && Password === 'admin') {
            // If number and password match, consider it an admin login
            // Send a JSON response with the redirection URL
            return res.status(200).json({ redirectTo: '/admin-dashboard' }); // Change '/admin-dashboard' to your actual admin dashboard route
          }
      
          // If the name and password do not match admin credentials, continue with regular user login
          const user = await Signups.findOne({ EmailID }); // Exclude the otp field from the query
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const loginData = new Login({
            EmailID,
            Password, // Do not store the plain password; this is for demonstration purposes only
            userId: user._id,
          });
      
          await loginData.save();
      
          // Send the token in the JSON response to the frontend for regular users
          return res.status(201).json({message: 'login succeful!' });
        } catch (err) {
          console.error('Error occurred during login:', err);
          return next(err);
        }
      };
      const avaiblebook = async (req, res, next) => {
        try {
          // Find all books with bookStatus set to "Available"
          const availableBooks = await Book.find({ bookStatus: 'Available' });
          res.json(availableBooks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
      const issuedbooks = async (req, res, next) => {
        const { Collage_id } = req.body; // Change userId to Collage_id
        try {
          // Find all books issued to the user with the given Collage_id
          const issuedBooks = await issuedbooksss.find({ Collage_id: Collage_id });
          res.json(issuedBooks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
      
      module.exports = { issuedbooks };
      

    
    module.exports = { signup,login,avaiblebook,issuedbooks};