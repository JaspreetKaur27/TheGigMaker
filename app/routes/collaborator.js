

const express = require("express");
const router = express.Router();

const db = require("../models/index");

const mongoose = require('mongoose');

const Project = require('../models/projects');
const User = require('../models/users');
const Collaborator = require('../models/collaborator');



//projectId and user Id

router.post("/collab-pending", function (req, res) {


    if (req.body.projectId) {
     var query = req.body
    }
// notifications the user sends a small paragraph of why they liked they are suited to participate

    Project.findOneAndUpdate({_id: query.projectId }, { $push: { gigster:{ userId:query.userId, approved:false, notifications:query.notifications} } }, { new: true })
        .then(doc =>  {

            console.log("doc collab-pending" + doc);
    

            User.findByIdAndUpdate({_id : query.userId}, {$push:{collaborations:{_id :query.projectId, approved : false}}})
            .then(gigsterCollaborator =>{
    
                console.log(gigsterCollaborator);
            })
        

            res.status(200).json({
                
                message: "The Gigmaker has been notified!, ",
                url : "head back to see all projects !http://localhost:3001/projects/all",
                collaboration: doc
                
            
            });

            // User.findOneAndUpdate({ _id: dbProject.userId }, { $push: { collaborations: collaborator } })
        });
    
    // userId was passed from the front end
    // .then(dbProject => {
    //     Project.findOneandUpdate({ _id: query.userId }, { $push: { collaboration: saved_project._id } }), function (err, user) {
    //         console.log(user);
    //         if (err) throw err;

    //         console.log("user" + user.username + "want to collab on project" + saved_project.title + saved_project._id);

    //         // returns the User profile to then be sent to the original gigmaker
    //         res.redirect(user);

    //     }
    // })
});

//gigmaker approves gigster
// projectID
// gigsterID
// appproved : true
// activate Trello?
router.post("/collab-approval", function (req, res) {
    if (req.body.gigsterId) {
        var query = req.body
       }
        Project.findOneAndUpdate({_id : query.projectId}, {gigster:{userId : query.gigsterId, approved:query.approved}})
        .then( gigster => {

            console.log(gigster);

        // the gigster collaboration array is updated with the project Id that he is participating
        // As well as he is array is turned to approved True

        User.findByIdAndUpdate({_id : query.gigsterId}, {$set:{collaborations:{_id :gigster, approved : true}}})
        .then(gigsterCollaborator =>{

            console.log(gigsterCollaborator);
        })
    
        res.status(200).json({

            message: "You have approved the following gigster to participate in your project!",
            gigster: gigster

        });

    }).catch( err => {
        res.status(500).json({
            message: "Approval was not sent, please try again",
            error : err
        });
    });
});







module.exports = router; 