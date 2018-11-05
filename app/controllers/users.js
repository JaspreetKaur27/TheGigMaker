var User = require("../models/projects/users")

module.exports = {
create : function (query, cb){
//   Project.saved = true;
    console.log(query);
 return   User.collection.insertOne(query, {ordered: false}, function(err,docs){
        // returns any errors without blocking the scraping

        console.log(docs + "Docs");
        cb(err,docs,query);
    });
},

// users need to be validated at this point by the creator


delete : function (query, cb){
    console.log(query);
User.deleteOne({_id:query.id},cb);
},

// gets everything in the schema
get: function (query,cb){

    console.log(query);
   
    User.find(query)
    .sort({
        _id: -1
    })
    .exec(function(err,docs){
        cb(err,docs);
    })
},



// gets all content from an specific field
// gets either all collaborations or all projects
getSpecific: function (query,cb){
   
    //projection
    User.find({_id:query.id}, query)
    .sort({
        _id: -1
    })
    .exec(function(err,docs){
        cb(err,docs,query);
    })
},

update : function(query,cb){
    Project.updateOne({_id:query.id},{
       $set:query 
    }, {}, cb);
    }
}

