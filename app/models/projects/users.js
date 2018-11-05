var mongoose = require("mongoose");

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

// Export the User model
module.exports = User;