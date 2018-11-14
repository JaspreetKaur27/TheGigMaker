
// Project controller

var Project = require("../models/projects/projects");
var User = require("../models/projects/users");

module.exports = {
    create : function (query, cb){
    //   Project.saved = true;
        
        return   Project.collection.insertOne(query, function(err,docs){
                // returns any errors without blocking the scraping

                cb(err,docs,query);
            });
    },

    //logined user
    //passport gives you the user ID to be referenced later
    // const project = new Project({
    //     name: req.body.name
    // }).save(function(err, saved_project){
    //     User.findOneandUpdate({_id: req.user.id}, {$push: {projects: saved_project._id}}), function(err, user){
            
    //     })
    // })



delete : function (query, cb){
    Project.deleteOne({_id:query.id},cb);
},
get: function (query,cb){
   console.log(query);
    Project.find(query)
    .sort({
        _id: -1
    })
    .exec(function(err,docs){
        cb(err,docs);
    })
},
update : function(query,cb){
    Project.updateOne({_id:query.id},{
       $set:query 
    }, {}, cb);
    },



    // users need to be validated at this point by the creator
collab : function(query,cb){
    // project id is passed to recognize what project the use wants to collab
    console.log(query);

    User.updateOne({_id:query.userId},{
        // a gigster request is added to the array of gigsters for that project and his user Id updates the collaborator schema,
        // which references the user model ( himself)
           $push: { collaboration : {userId : query.userId} }
        });

    Project.updateOne({_id:query._id},{
    // a gigster request is added to the array of gigsters for that project and his user Id updates the collaborator schema,
    // which references the user model ( himself)
       $push: { gigster : {userId : query.userId, approved:false} }
    }, {}, cb);
},



// (creator option only)
approve : function(query,cb){
    // project id is passed to recognize what project are collaborators requesting to join
    Project.updateOne({_id:query.id},{
    // upon approval from the creator the gigster who requested collaboration is updated to true
       $set: { gigster : {userId : query.userId, approved:true} }
    }, {}, cb);
},

// gets all content from an specific field
// gets all collaborators for a particular project
getSpecific: function (query,cb){
   
    //projection
    // {gigsters : 1}
    // finds specific project
    Project.find({_id:query.id},{gigster : {approved : true}})
    .sort({
        _id: -1
    })
    .exec(function(err,docs){
        cb(err,docs,query);
    })
},


    
}

