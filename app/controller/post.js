var mongoose=require('mongoose');
var express=require('express');

//express router //used to define routes
var userRouter = express.Router();
var postModel = mongoose.model('Post')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require('./../../middlewares/auth');
