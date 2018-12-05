const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({

  //Todo change the useId name to gigsterId for confusion purposes

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
    
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project"
    
  },

  gihub: {
    type: String
  },
  
  approved: false,
  notifications :[ {
    type: String,
    trim: true

  }],
});



 var Collaborator = mongoose.model("Collaborator", collaboratorSchema);



 module.exports = Collaborator;