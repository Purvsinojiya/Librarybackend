const express = require('express');
const userRouter = express.Router();
const {getallbooks,getalluser,addbooks,isubook,allisuuedbook} = require("../Controler/AdminControler")


userRouter.get('/books',getallbooks);
userRouter.get('/alluser',getalluser);
userRouter.get('/allissuedbook',allisuuedbook);
userRouter.post('/addbook',addbooks);
userRouter.post('/issuebook',isubook);


module.exports = userRouter;