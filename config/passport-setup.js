const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../app/models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });   
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: 'https://thegigmaker.herokuapp.com' + '/api/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret, 
        proxy:true
    }, (acessToken, refreshToken, profile, done) => {
        // passport callback function
        // console.log("passport callback function fired");
        console.log(profile);
        console.log("---------------");
        console.log(profile.emails[0]['value']);

        //check if user already exists in our db
        User.findOne({ googleId: profile.id }).then((currentUser) => {

            if (currentUser) {
                //already have a user
                // console.log('user is: '+ currentUser);
                done(null, currentUser);
            }
            else {
                //if not create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0]['value']
                }).save().then((newUser) => {
                    console.log("New user created: " + newUser);
                    done(null, newUser);
                });
            }
        });



    })
);