

const express = require("express");
const router = express.Router();

const db = require("../models/index");

const mongoose = require('mongoose');

const Project = require('../models/projects');

const Collaborator = require('../models/collaborator')

const User = require('../models/users');




//projectId and user Id

router.post("/collab-pending", function (req, res) {

        
    if (req.body.projectId) {
        var query = req.body


        console.log(query);
    }
    // notifications the user sends a small paragraph of why they liked they are suited to participate

    Collaborator.create(query).then(collaborator => {

        console.log("collaborator obj" + collaborator);
        console.log("project Id Test" + req.body.projectId);

        // populate not being retrieved by the user model , have to populate another user schema collaborations to retrieve 
        //gigster Id
        Project.findOneAndUpdate({ _id: req.body.projectId }, { $push: { gigster: collaborator._id } }, { new: true })
            .then(dbCollaborator => {

                res.json(dbCollaborator); 


                User.findByIdAndUpdate({ _id: collaborator.userId }, { $push: { collaborations: { _id: query.projectId} } })
                    .then(gigsterCollaborator => {

                        console.log(gigsterCollaborator);
                    })

                res.status(200).json({

                    message: "The Gigmaker has been notified!, ",
                    url: "head back to see all projects !http://localhost:3001/projects/all",
                    collaboration: doc

                });

            })
            })
            .catch(err => {

                res.status(500).json({
    
                    message: "Project was not created succesfully please try again",
                    error: err
                });
    
            });   
});

//collaborators get all



//gigmaker approves gigster
// projectID
// gigsterID
// appproved : true
// activate Trello?
router.post("/collab-approval/:id", function (req, res) {
    var query ={};
    
    if (req.params.id) {
        query._id = req.params.id
    }

    console.log(query);

    Collaborator.findByIdAndUpdate({_id : query._id},{$set:{approved:true}},{new:true}).then(collaborator => {

        console.log(collaborator);

     

        // Project.findOneAndUpdate({ _id: collaborator.projectId }, { gigster: collaborator })
        //     .then(gigster => {

        //         console.log(gigster);

        //         // the gigster collaboration array is updated with the project Id that he is participating
        //         // As well as he is array is turned to approved True

        //         User.findByIdAndUpdate({ _id: query.gigsterId }, { $set: { collaborations: { _id: gigster, approved: true } } })
        //             .then(gigsterCollaborator => {

        //                 console.log(gigsterCollaborator);
        //             })

                res.status(200).json({

                    message: "You have approved the following gigster to participate in your project!",
                    gigster: collaborator

                });

            }).catch(err => {
                res.status(500).json({
                    message: "Approval was not sent, please try again",
                    error: err
                });
            });

    });
// });




//projectId
//delete gigster
router.post("/collab-deny/:id", function (req, res) {
    var query = {};
    if (req.params.id) {
        query._id = req.params.id
    }

    console.log("deny" +  req.params.id );

    Collaborator.findByIdAndDelete({ _id: query._id})
        .then(gigster => {



            res.json({ data: gigster + "gigster has been deleted!" });

            // the gigster collaboration array is changed to deny with the project Id that he is participating


            // User.findByIdAndDelete({_id : query.gigsterId}, {$set:{collaborations:{_id :gigster}}})
            // .then(gigsterCollaborator =>{

            //     console.log(gigsterCollaborator);
            // })

            // res.status(200).json({

            //     message: "You have approved the following gigster to participate in your project!",
            //     gigster: gigster

            // });

        }).catch(err => {
            res.status(500).json({
                message: "Approval was not sent, please try again",
                error: err
            });
        });
});








module.exports = router; 