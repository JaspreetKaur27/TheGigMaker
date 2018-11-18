


const db = require("../models/index");

const mongoose = require('mongoose');

const Project = require('../models/projects');
const User = require('../models/users');


// Project Crud actions


// Create project


module.exports = function (router) {

    // Home route
    router.get("/", function (req, res) {
        res.send("hello there!");
    });




// getting all or a particular project based on Id

    router.get("/api/get-dbprojects", function (req, res) {
        var query = {};

        if ( req.body.projectId){
            query._id = req.body.projectId;
        }

        console.log(query);
        Project.find(query)
        .then(dbProjects => {

        
            if (dbProjects.length >= 1 ) {

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
        .catch( err => {
            res.status(500).json({
                message: "Project was not found",
                error : err
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

    router.post("/api/create-project", function (req, res) {
        const newProject = req.body;

        console.log(newProject);

        Project.create(newProject)
        .then(dbProject => {

            User.findOneAndUpdate({_id : req.body.userId}, {$push:{projects:dbProject}}, {new : true})
            .then(dbUser => {
                res.status(200).json({

                    message: "Project was created succesfully!",
                    Project : dbUser
                });
            });
        })
        .catch( err => {

            res.status(500).json({

                message: "Project was not created succesfully please try again",
                error : err
            });

        });

    });



    // all the projects contain the User id (gigmaker)
    // front end passport sends project Id and User ID
    // The gigmaker get a request in the projects updated gigster arrays


    // need gigmaker userId 
    // need gigster userId

    router.post("/api/project-collab-pending", function (req, res) {
        var query = {};

        if (req.body.projectId){
            query._id = req.body.projectId
        }
        var query = req.body;
        console.log(req.body)

        Project.findOneAndUpdate({id :query._id}, { $push: { gigster: query} }, { new: true })
        .then(project => {

            res.status(200).json(project);
        })
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


    // delete project (creator)
    router.delete("/api/delete-project", function (req, res) {
        var query = {};

        query._id = req.body.id;
        console.log(query._id);

        Post.delete(query, function (err, data) {
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
    router.put("/api/update-project", function (req, res) {
        Post.update(req.body, function (err, data) {
            if (data) {
                res.status(200).json("project has been updated");
            } else {
                console.log(err);
                res.redirect("/");

            }

        });
    });




    // collaboration button
    // user is linked to the project 
    // Trello is populated upon acceptance
    // adding notes
    router.post("/api/project-collab-pending", function (req, res) {
        console.log(req.body)
        var query = req.body;

        Post.collab(query, function (err, data) {
            if (data) {
                res.json(data);
            } else {
                console.log(err);
                res.redirect("/");

            }
        });
    });

    // // Creator approval button route
    // router.put("/api/project-collab-pending", function (req, res) {
    //     console.log(req.body)
    //     var query = req.body;

    //     User.approve(query, function (err, data) {

    //         if (data) {
    //             res.status(200).json(data);
    //         } else {
    //             console.log(err);
    //             res.redirect("/");

    //         }
    //     });
    // });

    // see all collaborator within a project
    // router.post("/api/get-projectCollaborators/:id?", function (req, res) {
    //     var query = {}
    //     if (req.params.id) {
    //         query._id = req.params.id;
    //     }

    //     User.getSpecific(query, function (err, docs, data) {

    //         console.log(docs);

    //         if (docs) {

    //             res.status(200).json(data);

    //         } else {
    //             console.log(err);
    //             res.redirect("/");

    //         }
    //     });
    // });

}

