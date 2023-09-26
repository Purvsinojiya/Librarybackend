const express = require('express');
const userRouter = express.Router();
const {signup,login,avaiblebook,issuedbooks} = require("../Controler/userControler.js")


userRouter.post('/Signup',signup);
userRouter.post('/login',login);
userRouter.get('/avaiblebook',avaiblebook);
userRouter.get('/issuedbook',issuedbooks);

module.exports = userRouter;