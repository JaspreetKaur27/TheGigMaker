
const express = require('express');
const router = express.Router();
const db = require("../models/projects/index")
const User = require('../controllers/users')




module.exports = function(router) {



// see all user  saved Projects 
// projects
router.get("/api/createdProjects", function (req, res) {
   

    var query = req.body;

    User.getSpecific(query, function (err, data) {
        if (data.result.ok) {
            res.status(200).send('Here are your created projects');
        } else {
            console.log(err);
        }
    });
});


// see all user collaborations 
//collaborations
router.get("/api/savedCollaborations", function (req, res) {
    var query = req.body;
    User.getSpecific(query, function (err,docs, data) {
        if (docs.result.ok) {
            
            res.status(200).json('Your collaboration are : ' + data);
        } else {
            console.log(err);
        }
    });
});





// get user info 

router.post("/api/get-dbuser/:id", function (req, res){
    var query = {}
    if ( req.params.id) {
        query._id = req.params.id;
    }

    User.get(query, function (err,docs){
        console.log(docs);

        if (docs){
            res.status(200).json(docs);
        } else {

            console.log(err);
            res.redirect('/');
        }

    })    
});


// Create User
router.post("/api/create-user", function (req, res) {
    var query = req.body;
    User.create(query, function (err, docs, data) {
        console.log(data + "data");
        if (docs.result.ok) {
            console.log(data)
            res.status(200).json(docs);
        } else {
            console.log(err);
            res.redirect("/");
        }
    })
});



// delete user
router.delete("/api/delete-user/:id", function (req, res) {
    var query = {};
    query.id = req.params.id;
    User.delete(query, function (err, data) {
        if (data) {
            res.status(200).send('User Deleted!');
        } else {
            console.log(err);
            res.redirect("/");
        }
    });
});


// update user info
router.put("/api/update-user", function (req, res) {


    User.update(req.body, function (err, data) {
        if (data) {
            res.status(200).send('User updated!');
           } else {
            console.log(err);
            res.redirect("/");
        }

    });
});


// get project specific information or all users
router.get("/api/project/:project_id?", function (req, res) {
    var query = {};
    if (req.params.project_id) {
        query._id = req.params.project_id;
    }
    Project.get(query, function (err, data) {
        if (data) {
            res.json(data);
            res.status(200).send('User Search was a success!');
        
           } else {
            console.log(err);
            res.redirect("/");
        }
     
    });
});

}