var mongoose = require("mongoose");
// var bcrypt = require("bcrypt.js");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var UserSchema = new Schema({
 
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },

  googleId: {
    type: String,
    trim: true,
    required: "Password is Required",
  },

  email: {
    type: String,
    unique: true,
    // match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
 
  userCreated: {
    type: Date,
    default: Date.now
  },



  // if collaboration is true populate the user info to the creator
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  ],

  collaboration: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProjectCollaborators"
    }
  ]
});



var User = mongoose.model("User", UserSchema);

// module.exports.createUser = function (newUser, callback){
//   bcrypt.genSalt(10, function (err, salt){
//     bcrypt.hash(newUser.password, salt, function (err, hash){
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// }

// module.exports.getUserById= function (username , callback){
//   var query = {username:username};
//   User.findOne(query,callback);
// }

// module.exports.getUserById = function (id, callback){
//   User.findById(id, callback);
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, function (err, isMatch){

//     if (err) throw err;

//     callback(null, isMatch);
//   });
// }

// Export the User model
module.exports = User;