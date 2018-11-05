
const express = require('express');
const router = express.Router();
const db = require("../models/projects/index");

const Project = require('../controllers/project');



// Project Crud actions


// Create project



module.exports = function(router) {

    // Home route
    router.get("/", function(req,res){
     res.send("hello there!");
    });




    // Gets All projects in the data base
    // Upon click the id headline belonging to a project is sent
    // the database sends back specific info for that project

    router.get("/api/get-dbprojects/:id?", function (req, res){
        var query = {}
        if ( req.params.id) {
            query._id = req.params.id;
        }

        Project.get(query, function(err,docs){

            console.log(docs);
            
            if(docs){

                res.status(200).json(docs);

            } else {
                console.log(err);
                res.redirect("/");

            }
        });
    });




    // create new project (creator)
    router.post("/api/create-project", function (req, res){
        var query = req.body;
           Project.create(query, function (err, docs, data){
               console.log(docs);
               if (docs.result.ok) {
                   console.log("project created");
                    res.status(200).json(data);
               } else {

                    console.log(err);
                    res.redirect('/');
                    
               }
           })
        });



    // delete project (creator)
    router.delete("/api/delete-project", function (req, res){
        var query = {};
      
        query._id = req.body.id;
        console.log(query._id);
    
        Project.delete(query, function (err,data){
            if (data){
                res.status(200).send('project has been deleted');
            } else {
                console.log(err);
                res.redirect("/");

            }

        });
    });


    // update content (creator)
    // do we need to send back updated info?
    router.put("/api/update-project", function (req, res){
        Project.update(req.body, function (err, data){
            if (data){
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
    router.post("/api/project-collab-pending", function (req, res){
        console.log(req.body)
        var query = req.body;
        
        Project.collab(query, function(err, data){
        if (data){
            res.json(data);
        } else {
            console.log(err);
            res.redirect("/");

        }
        });
    });

    // Creator approval button route
    router.put("/api/project-collab-pending", function (req, res){
        console.log(req.body)
        var query = req.body;
        
        Project.approve(query, function(err, data){

        if (data){
            res.status(200).json(data);
        } else {
            console.log(err);
            res.redirect("/");

        }
        });
    });
    
    // see all collaborator within a project
    router.post("/api/get-projectCollaborators/:id?", function (req, res){
        var query = {}
        if ( req.params.id) {
            query._id = req.params.id;
        }

        Project.getSpecific(query, function(err,docs,data){

            console.log(docs);
            
            if(docs){

                res.status(200).json(data);

            } else {
                console.log(err);
                res.redirect("/");

            }
        });
    });

}

