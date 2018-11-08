
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express();
const router = express.Router();

const mongoose = require("mongoose");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');




// Setup express server
const PORT = process.env.PORT || 3001;

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// // Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


var db = process.env.MONGODB_URI || "mongodb://localhost/gigmaker";

//routes


var projectRoutes = require("./app/routes/project")(router);
var userRoutes = require('./app/routes/users')(router);




// require("./app/routes/project")(router);
// // user routes

// require("./app/routes/users")(router);
app.use(router);


//****************************************** passport Authentification*********************************************
// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

  while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param : formParam,
    msg   : msg,
    value : value
  };
}
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.user || null;
next();
});







// *************************************************Authentification End**********************************************

app.listen(PORT, function () {
  mongoose.connect(db, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Mongodb connection succesful!");
    }

  });

  console.log("App running on port " + PORT + "!");
});

module.exports = app // for testing

