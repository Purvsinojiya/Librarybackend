const mongoose = require('mongoose');
const DB = 'mongodb+srv://21ce135:Purv1234@cluster0.fr6ofnk.mongodb.net/'; // Replace with your MongoDB connection string

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connection to MongoDB successful');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });