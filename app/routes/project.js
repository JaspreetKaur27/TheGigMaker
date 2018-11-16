


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


    // Gets All projects in the data base
    // Upon click the id headline belonging to a project is sent
    // the database sends back specific info for that project


    // Project.updateOne({_id:query._id},{
    //     // a gigster request is added to the array of gigsters for that project and his user Id updates the collaborator schema,
    //     // which references the user model ( himself)
    //        $push: { gigster : {userId : query.userId, approved:false} }
    //     }, {}, cb);


// getting all projects from a Users account
    router.get("/api/get-dbprojects", function (req, res) {
        var query = req.body;

        User.find({_id : query.userId} ,function (err, dbProjects) {

        
            if (dbProjects) {

                res.status(200).json(dbProjects);

            } else {
                console.log(err);
                res.redirect("/");

            }
        });
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

    //
    router.post("/api/create-project", function (req, res) {
        const newProject = req.body;

        Project.create(newProject)
        .then((err,dbProject) => {

            User.insertOne({_id : req.body.userId, {}})



            if (dbProject) {
                 res.status(200).json({
                    message: "Project was created succesfully!"
                });

            } else {

                res.status(500).json({
                    message: "Project was not created please try again"
                })
                    
            }


            



         
            if (dbProject) {
            
                res.status(200).json(dbProject);
                console.log("Project " + dbProject.title + " has been created");
            } else {
                console.log(err);
                res.redirect("/");
            }
        }).then
    });





    // all the projects contain the User id (gigmaker)
    // front end passport sends project Id and User ID
    // The gigmaker get a request in the projects updated gigster arrays


    // need gigmaker userId 
    // need gigster userId

    router.post("/api/project-collab-pending", function (req, res) {
        console.log(req.body)
        var query = req.body;

        Project.findOneandUpdate({ _id: query.userId }, { $set: { projects: query.userId, approved: false } }, { new: true })

            // userId was passed from the front end
            .save(function (err, saved_project) {
                Project.findOneandUpdate({ _id: query.userId }, { $push: { collaboration: saved_project._id } }), function (err, user) {
                    console.log(user);
                    if (err) throw err;

                    console.log("user" + user.username + "want to collab on project" + saved_project.title + saved_project._id);

                    // returns the User profile to then be sent to the original gigmaker
                    res.redirect(user);

                }
            })
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

