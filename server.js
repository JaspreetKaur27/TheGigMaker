
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

