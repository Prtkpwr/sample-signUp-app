var express = require('express');
var app = express();
//module for maintaining sessions in client cookies
var session = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// path is used to get path of our files from our system
var path = require('path');

app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

//initializing session middleware
app.use(session({
	name: 'myCookie',
	secret: 'mySecret', //encryption key
	resave: true, 
	httpOnly: true, //to avoid cookie forgrey
	saveUninitialized: true,
	cookie: {secure: false} //make true for ssl
}));

//set the template engine
app.set('view engine','jade');

//set the views folder
app.set('view',path.join(__dirname + '/app/view'));

//initializing database
var dbpath = "mongodb://localhost/signUpDB";

//command to connect with database

db = mongoose.connect(dbPath);

mongoose.connection.once('open',function(){
	console.log("Databse Connected Successfully");
});

//fs module ,by default for file management in nodejs
var fs = require('fs');

//include all our model files
fs.reddirSync('./app/model').forEach(function(file){
//check if the file is js or not
	if(file.indexOf('.js'))
	//if it is js then include the file
	require('./app/model/' + file);

}); //end for each

//including controller
fs.reddirSync('./app/controller')forEach(function(file){
//check if it is js file
if(file.indexOf('.js')){
//include if js file
require('./app/controller/'+file);
//call controller function of each file and pass your controller through it
route.controllerFunction(app)
	}//if loop ends
});// end for each

//including auth file here

var auth = require('./middleware/auth');
var mongoose = require('mongoose');
var userModel = mongoose.model('User');

//set the middleware as an application level middleware
app.use(function(req,res,next){

	//its checking wether this session and session.user exist or not

	 //to check if its a legitimate user of the system
	 if(req.session && req.session.user){
	 	userModel.findOne({'email':req.session.user.email},function(err,user){

	 		if(user){
	 			//setting another variable here
	 			req.session.user = user;
	 			//deleting the password
	 			delete.req.session.user.password;
	 			next()
	 		}
	 		else{
	 			// do nothing , because this is just to set the values
	 		}
	 	});
	 }
	 else{
	 	next();
	 }

});

app.use(function(err,req,res,next){
	res.status(err.status || 500);
	res.render('error',{
		message: err.message,
		error: err
	});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});