
const express = require('express');
const router = express.Router();
const db = require("../models/projects/index");
const User = require('../controllers/users');
const userModel = require('../models/projects/users');
const localStrategy = require('passport-local').Strategy;




module.exports = function(router) {


//********************Authentification*********************** */


//Register User

// router.get('/register',function (req,res){

//     var name = req.body.name;
//     var email = req.body.email;
//     var username = req.body.username;
//     var password = req.body.password;
//     var password2 = req.body.password2;

//     console.log(name);


//     // validation

//     router.post('/register', function (req, res) {
//         var name = req.body.name;
//         var email = req.body.email;
//         var username = req.body.username;
//         var password = req.body.password;
//         var password2 = req.body.password2;
    
//         // Validation
//         req.checkBody('name', 'Name is required').notEmpty();
//         req.checkBody('email', 'Email is required').notEmpty();
//         req.checkBody('email', 'Email is not valid').isEmail();
//         req.checkBody('username', 'Username is required').notEmpty();
//         req.checkBody('password', 'Password is required').notEmpty();
//         req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
//         var errors = req.validationErrors();
    
//         if (errors) {
//             res.render('register', {
//                 errors: errors
//             });
//         }
//         else {
//             //checking for email and username are already taken
//             userModel.findOne({ username: { 
//                 "$regex": "^" + username + "\\b", "$options": "i"
//         }}, function (err, user) {
//                 userModel.findOne({ email: { 
//                     "$regex": "^" + email + "\\b", "$options": "i"
//             }}, function (err, mail) {
//                     if (user || mail) {
//                         res.render('register', {
//                             user: user,
//                             mail: mail
//                         });
//                     }
//                     else {
//                         var newUser = new userModel({
//                             name: name,
//                             email: email,
//                             username: username,
//                             password: password
//                         });
//                         userModel.create(newUser, function (err, user) {
//                             if (err) throw err;
//                             console.log(user);
//                         });
//                  req.flash('success_msg', 'You are registered and can now login');
//                         res.redirect('/users/login'); // create a login page***************************
//                     }
//                 });
//             });
//         }
//     });

// //Login

// passport.use(new LocalStrategy(
// 	function (username, password, done) {
// 		User.getUserByUsername(username, function (err, user) {
// 			if (err) throw err;
// 			if (!user) {
// 				return done(null, false, { message: 'Unknown User' });
// 			}

// 			userModel.comparePassword(password, userModel.password, function (err, isMatch) {
// 				if (err) throw err;
// 				if (isMatch) {
// 					return done(null, user);
// 				} else {
// 					return done(null, false, { message: 'Invalid password' });
// 				}
// 			});
// 		});
// 	}));

// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
// 	userModel.getUserById(id, function (err, user) {
// 		done(err, user);
// 	});
// });

// router.post('/login',
// 	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/');
// 	});

// router.get('/logout', function (req, res) {
// 	req.logout();

// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('/users/login');
// });


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