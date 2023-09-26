const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const Routes = require('./Route/userRoutes');
const AdminRoutes = require('./Route/adminRoutes');
// const adminRouter = require('./Route/adminRoutes');
const cors = require('cors');

app.use(express.json());
require('./db.js');
app.use(cors()); 
app.use('/user', Routes);
app.use('/admin',AdminRoutes)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});


const port = 3000;
app.listen(port, function () {
  console.log("Server is listening on " + port);
});
