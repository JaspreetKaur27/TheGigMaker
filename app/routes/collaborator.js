

const express = require("express");
const router = express.Router();

const db = require("../models/index");

const mongoose = require('mongoose');

const Project = require('../models/projects');
const User = require('../models/users');
const Collaborator = require('../models/collaborator');



//projectId and user Id
router.post("/collab-pending", function (req, res) {


    if (req.body.projectId) {
        var query = req.body
    }


    Collaborator.create(query)
        .then(collaborator => {

            Project.findOneAndUpdate({ _id: collaborator.projectId }, { $push: { gigster: collaborator } }, { new: true })
                .then(function () {
                    User.findOneAndUpdate({ _id: collaborator.userId }, { $push: { collaborations: collaborator } })
                })
                .then(function () {

                    res.status(" Collaboration pending");
                });

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

});

module.exports = router; 