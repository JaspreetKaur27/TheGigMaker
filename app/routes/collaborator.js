

const express = require("express");
const router = express.Router();

const db = require("../models/index");

const mongoose = require('mongoose');

const { Project, Collaborator } = require('../models/projects');

const User = require('../models/users');




//projectId and user Id

router.post("/collab-pending", function (req, res) {


    if (req.body.projectId) {
        var query = req.body
    }
    // notifications the user sends a small paragraph of why they liked they are suited to participate

    Collaborator.create(query).then(collaborator => {




        Project.findOneAndUpdate({ _id: query.projectId }, { $push: { gigster:  collaborator } }, { new: true })
            .then(doc => {

                console.log("doc collab-pending" + doc);


                User.findByIdAndUpdate({ _id: collaborator.userId }, { $push: { collaborations: { _id: query.projectId, approved: false } } })
                    .then(gigsterCollaborator => {

                        console.log(gigsterCollaborator);
                    })


                res.status(200).json({

                    message: "The Gigmaker has been notified!, ",
                    url: "head back to see all projects !http://localhost:3001/projects/all",
                    collaboration: doc


                });

              
            });


    })
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

    Collaborator.findOneAndUpdate(query).then(collaborator => {

    Project.findOneAndUpdate({ _id: query.projectId }, { gigster: { userId: query.gigsterId, approved: query.approved } })
        .then(gigster => {

            console.log(gigster);

            // the gigster collaboration array is updated with the project Id that he is participating
            // As well as he is array is turned to approved True

            User.findByIdAndUpdate({ _id: query.gigsterId }, { $set: { collaborations: { _id: gigster, approved: true } } })
                .then(gigsterCollaborator => {

                    console.log(gigsterCollaborator);
                })

            res.status(200).json({

                message: "You have approved the following gigster to participate in your project!",
                gigster: gigster

            });

        }).catch(err => {
            res.status(500).json({
                message: "Approval was not sent, please try again",
                error: err
            });
        });

    });
});




router.post("/collab-deny", function (req, res) {
    if (req.body.gigsterId) {
        var query = req.body
    }
    Collaborator.findByIdAndRemove({ _id: query.p })
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