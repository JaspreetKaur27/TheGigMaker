
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express();
const router = express.Router();

const mongoose = require("mongoose");

// global promises
mongoose.Promise = global.Promise;




// Setup express server
const PORT = process.env.PORT || 3001;

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// allows other servers to maker requests coming from other localhost users
// We prevent CORS Errors  Cross Origin Resource Sharing (security mecanism from the browser)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

// Defines what kind of headers we accept from other Users
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  // Incoming request method (property which gives access to the HTTP method being used) on the request
  //  The Browser sends an Options request before to tell the browser what it should send before hand
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET ');
    res.status(200).json({});
  }  

  next();
});

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

