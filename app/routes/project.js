


const db = require("../models/projects/index");

const Project = require('../models/projects/projects');
const User = require('../models/projects/users')



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



       //logined user
    //passport gives you the user ID to be referenced later, need to send a key of UserID
    // const project = new Project({
    //     name: req.body.name
    // }).save(function(err, saved_project){
    //     User.findOneandUpdate({_id: req.user.id}, {$push: {projects: saved_project._id}}), function(err, user){
            
    //     })
    // })



    // create new project and save it in the users projects array (creator)
    router.post("/api/create-project", function (req, res){
        var query = req.body;

        Project.collection.insertOne(query, {new :true},function (err, saved_project){

          

    

            console.log("saved project" +  saved_project.ops[0]);
            if (err) throw err;


         User.collection.findOneAndUpdate({_id : saved_project.ops[0].userId  }, {$push: {projects: saved_project.ops[0]._id}}, function (err, user){
                
                console.log(user);
                if (err) throw err;
                //send back all user projects
                console.log('Project Created' + user);
                res.json(user);
            });
           
        });
        
    
    });
        // all the projects contain the User id (gigmaker)
    // front end passport sends project Id and User ID
    // The gigmaker get a request in the projects updated gigster arrays


    router.post("/api/project-collab-pending", function (req, res){
        console.log(req.body)
        var query = req.body;
        
        Project.UpdateOne({_id : query._id}, {$push:{gigster : query.userId, approved:false}}, {new:true})
        
        // userId was passed from the front end
        .save(function (err,saved_project){
            User.findOneandUpdate({_id : query.userId}, {$push:{collaboration:saved_project._id}}), function (err, user){
                console.log(user);
                if (err) throw err;

                console.log("user" + user.username + "want to collab on project" + saved_project.title + saved_project._id);
                
                // returns the User profile to then be sent to the original gigmaker
                res.redirect(user);

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

