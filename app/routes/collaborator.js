

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


        // console.log(query);
    }
    // notifications the user sends a small paragraph of why they liked they are suited to participate

    Collaborator.create(query).then(collaborator => {

        console.log("collaborator obj" + collaborator);
        console.log("project Id Test" + req.body.projectId);

        // populate not being retrieved by the user model , have to populate another user schema collaborations to retrieve 
        //gigster Id
        Project.findOneAndUpdate({ _id: req.body.projectId }, { $push: { gigster: collaborator._id } }, { new: true })
            .then(dbCollaborator=> {

                console.log("db collaborator " + dbCollaborator);
                // req.body.projectId 
                User.findOneAndUpdate({ _id: req.body.userId }, { $push: { collaborations: collaborator._id } },{new:true})
                    .then(gigsterCollaborator => {


                        console.log(gigsterCollaborator);
               

                res.status(200).json( [dbCollaborator]);

            })

            })
            .catch(err => {

                res.status(500).json({
    
                    message: "Project was not created succesfully please try again",
                    error: err
                });
    
            });   
});

});
//collaborators get all



//gigmaker approves gigster
// uses unique the identifier _id of that specific collaboration request



router.post("/collab-approval/:id", function (req, res) {
    var query ={};
    
    if (req.params.id) {
        query._id = req.params.id
    }

    console.log(query);

    Collaborator.findByIdAndUpdate({_id : query._id},{$set:{approved:true}},{new:true}).then(collaborator => {

        console.log(collaborator);

     

                // the gigster collaboration array is updated with the project Id that he is participating
                // As well as he is array is turned to approved True

                // User.findByIdAndUpdate({ _id: query.gigsterId }, { $set: { collaborations: { _id: gigster, approved: true } } })
                //     .then(gigsterCollaborator => {

                //         console.log(gigsterCollaborator);
                //     })

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
//_id generic Id generated from the instance of the collaboration to delete from the gimaker array of gigsters
// UserId of the gigster
//delete gigster by its unique notification request not by all of its user Id project participation
router.post("/collab-deny/:_id", function (req, res) {
    
    if (req.params._id) {
       var query = req.body
    }

    console.log( query );

    // delete _id self generated from the instance of the gigster schema

    Collaborator.deleteMany({_id: req.params._id}).then( gigster => {

        
    // User.findOneAndUpdate({_id:query.userId}, {$pull:{collaborations: query.projectId}})
    
    // .then(gigster => {

        // User.remove({collaborations:{_id : req.params._id} })
        // .then(deletedGigster => {

          res.json( gigster  );

        // console.log("gigster is here" + gigster);

 
    // });


 



            // });



           

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