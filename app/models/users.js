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

  email : {
    type: String,
    trim: true
  },

  userCreated: {
    type: Date,
    default: Date.now
  },



 
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],



  collaborations: [{ project: {type: Schema.Types.ObjectId,ref: "Collaborators"}, approved: false}]


  
});



var User = mongoose.model("User", UserSchema);


module.exports = User;