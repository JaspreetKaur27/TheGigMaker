const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({


  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  approved: Boolean,
});




 var Collaborator = mongoose.model("Collaborators", collaboratorSchema);



 module.exports = Collaborator;