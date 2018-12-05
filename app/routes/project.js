


const express = require("express");
const router = express.Router();

const db = require("../models/index");

const mongoose = require('mongoose');

const Project = require('../models/projects');
const User = require('../models/users');


// Project Crud actions


// Create project



// Home route
router.get("/", function (req, res) {
    res.send("hello there!");
});




// getting all or a particular project based on Id

router.get("/all/:projectId?", function (req, res) {
    var query = {};

    if (req.params.projectId) {
        query._id = req.params.projectId;
    }

    console.log(query);

    Project.find(query)
        .populate('gigster')
        .exec()
        .then(dbProjects => {

            console.log('herro' + dbProjects);

            res.status(200).json({
                message: "Project(s) has been found!",
                data : dbProjects

                // populatedProject: dbProjects.map(doc => {

                    

                //     // getting project Id
                //     // let projectId = doc.projects.map(projectId => projectId._id)

               

                //     console.log(doc);

                //     return {

                //         gigster: doc.gigster,
                //         _id: doc._id,
                //         userId: doc.userId,
                //         notifications: doc.gigster.notifications,
                //         approved: doc.gigster.approved,
                //         projectId: doc.gigster.projectId,
                //         url : "http://localhost:3001/projects/all/" + doc._id
                //     }


                })
            })
                .catch(err => {
                    res.status(500).json({
                        message: "Project was not found",
                        error: err
                    })
                })
        });

// });

//logined user
//passport gives you the user ID to be referenced later, need to send a key of UserID
// const project = new Project({
//     name: req.body.name
// }).save(function(err, saved_project){
//     User.findOneandUpdate({_id: req.user.id}, {$push: {projects: saved_project._id}}), function(err, user){

//     })
// })



// create new project and save it in the users projects array (creator)

router.post("/create", function (req, res) {
    const newProject = req.body;

    console.log(newProject);

    Project.create(newProject)
        .then(dbProject => {

            User.findOneAndUpdate({ _id: req.body.userId }, { $push: { projects: dbProject } }, { new: true })
                .then(dbUser => {
                    res.status(200).json({

                        message: "Project was created succesfully!",
                        Project: dbUser
                    });
                });
        })
        .catch(err => {

            res.status(500).json({

                message: "Project was not created succesfully please try again",
                error: err
            });

        });

});





// delete a project by Id (creator)
router.delete("/delete/:projectId", function (req, res) {

    console.log(req.params.projectId);

    Project.remove({ _id: req.params.projectId }, function (err, data) {
        if (data) {
            res.status(200).send('project has been deleted');
        } else {
            console.log(err);
            res.redirect("/");

        }

    });
});


// update content (creator)
// do we need to send back updated info?
router.put("/update/:projectId?", function (req, res) {

    console.log(req.params.projectId);


    Project.update({ _id: req.params.projectId }, { new: true }, function (err, data) {
        if (data) {
            res.status(200).json({
                message: "project has been updated!",
                data: data

            });
        } else {
            console.log(err);
            res.redirect("/");

        }

    });
});



//projectId and user Id aka (gigster ID)
// all the projects contain the User id (gigmaker)
// front end passport sends project Id and User ID
// The gigmaker get a request in the projects updated gigster arrays


// need gigmaker userId 
// need gigster userId













module.exports = router;