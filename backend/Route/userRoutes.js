const express = require('express');
const userRouter = express.Router();
const {signup,login,avaiblebook,issuedbooks} = require("../Controler/userControler.js")


userRouter.post('/Signup',signup);
userRouter.post('/login',login);
userRouter.get('/avaiblebook',avaiblebook);
userRouter.post('/issuedbook',issuedbooks);

module.exports = userRouter;