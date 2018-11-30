


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
        .then(dbProjects => {

            console.log(dbProjects);

            if (dbProjects.length >= 1) {

                res.status(200).json({
                    message: 'Search has been succesful!',
                    search: dbProjects
                });

            } else {

                res.status(404).json({
                    message: "Project doesnt exist",

                })

            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Project was not found",
                error: err
            })
        })
});



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
router.delete("/delete", function (req, res) {

    console.log(req.body.projectId);

    Project.remove({ _id: req.body.projectId }, function (err, data) {
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
router.put("/update", function (req, res) {

    console.log(req.body.projectId);


    Project.update({ _id: req.body.projectId }, function (err, data) {
        if (data) {
            res.status(200).json("project has been updated");
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