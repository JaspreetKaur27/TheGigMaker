const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  approved: Boolean,
});

var ProjectSchema = new Schema({

  title: {
    type: String,
    trim: true,
    required: "Title is required",
    validate: [
      function (input) {
        return input.length > 0;
      },
      "A title is required"
    ]
  },
  //based on postal code  7 characters 6 characters plus space
  location: {
    type: String,
    trim: true,
    required: "Address is required",


    validate: [

      function (input) {
        return input.length <= 7;
      },

      "Location is required"
    ]
  },

  imageUrl: {

    type: String,
    // required: "src is required",

  },



  // default gigmaker 
  gigmaker:
  {
    type: Schema.Types.ObjectId,
    ref: "User"
  },



  // 0 to many gigsters
  gigster: [collaboratorSchema],// [{user_id: 1, approved: false}, {user_id: 2, approved: true}]


  description: {
    type: String,
    trim: true,
    required: "Description is required",
    validate: [

      function (input) {
        return input.length <= 400;
      },

      "Location is required"
    ]
  },

  // iso format date
  startDate: {
    type: Date
  },

  // iso format date
  endDate: {
    type: Date,
  },


  duration: {
    start: Date
  },

  projectCreated: {
    type: Date,
    default: Date.now
  },
})


var Project = mongoose.model("Project", ProjectSchema);
var Collaborator = mongoose.model("ProjectCollaborators", collaboratorSchema);

module.exports =  Project, Collaborator;