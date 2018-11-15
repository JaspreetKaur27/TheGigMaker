
const express = require('express');
const router = express.Router();

const User = require('../models/users');

const mongoose = require('mongoose')




module.exports = function(router) {




// see all user  saved Projects 
// projects
router.get("/api/createdProjects", function (req, res) {
   

    var query = req.body;

    User.getSpecific(query, function (err, data) {
        if (data.result.ok) {
            res.status(200).send('Here are your created projects');
        } else {
            console.log(err);
        }
    });
});

// see all user collaborations 
//collaborations
router.get("/api/savedCollaborations", function (req, res) {
    var query = req.body;
    User.getSpecific(query, function (err,docs, data) {
        if (docs.result.ok) {
            
            res.status(200).json('Your collaboration are : ' + data);
        } else {
            console.log(err);
        }
    });
});


// get user info 

router.get("/api/get-dbuser", function (req, res){
    var query = {}
    if ( req.body.userId) {
        query._id = req.body.userId;
    }

    User.find(query,function (err,result){
      

        if (result){
            res.status(200).json(result);
            console.log("User" + result.username + "has been found");
        } else {

            console.log(err);
            res.redirect('/');
        }

    });   
});

// Create User
router.post("/api/create-user", function (req, res) {
    var query = req.body;
    User.create(query, function (err, dbUser) {
        console.log("User" + dbUser.username + "has been created");
        if (dbUser) {
        
            res.status(200).json(dbUser);
        } else {
            console.log(err);
            res.redirect("/");
        }
    })
});



// delete user
//TODO fix delete routes is not going through
router.delete("/api/delete-user/:id", function (req, res) {

    User.findOneAndRemove({_id :req.params.id},function (err, dbUser) {
        if (dbUser) {
            res.status(200).send('User ' + dbUser.username + " has been deleted!");
        } else {
            console.log(err);
            res.redirect("/");
        }
    });
});


// update user info
router.put("/api/update-user", function (req, res) {

    var query = req.body;

    console.log(query);


    User.findOneAndUpdate({_id: query.userId}, {$set:query}, {new:true})
    .then(function (dbUser) {
        if (dbUser) {
            res.json(dbUser);
            console.log("User " + dbUser.username + " has been updated!");
           } else {
            console.log(err);
            res.redirect("/");
        }

    });
});


// get project specific information or all project from a user

// we need user Id to know the owner of the project
// we need the project Id that we need to update
// we need the user id of the user to update in his collabs

router.get("/api/get-project", function (req, res) {
    var query = req.body;
  
    User.findOne({_id : query.userId}, function (err, data) {
        if (data) {
            res.json(data);
            res.status(200).send('User Search was a success!');
        
           } else {
            console.log(err);
            res.redirect("/");
        }
     
    });
});

}