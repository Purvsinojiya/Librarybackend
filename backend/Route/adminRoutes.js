const express = require('express');
const userRouter = express.Router();
const {getallbooks,getalluser,addbooks,isubook,allisuuedbook,addcategerios,allcategerious,returnbook } = require("../Controler/AdminControler")


userRouter.get('/books',getallbooks);
userRouter.get('/alluser',getalluser);
userRouter.get('/allcategerious',allcategerious);
userRouter.get('/allissuedbook',allisuuedbook);
userRouter.post('/addcategerios',addcategerios);
userRouter.post('/addbook',addbooks);
userRouter.post('/issuebook',isubook);
userRouter.delete('/returnbook',returnbook);

module.exports = userRouter;