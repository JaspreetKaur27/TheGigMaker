    const passport = require('passport');
    const JwtStrategy = require('passport-jwt').Strategy;
    const { ExtractJwt } = require('passport-jwt');

    //const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const GooglePlusTokenStrategy = require('passport-google-plus-token');
    const keys = require('./keys');
    const User = require('../app/models/users');

    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser((id, done) => {
    //     User.findById(id).then((user) => {
    //         done(null, user);
    //     });   
    // });

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: keys.JWT_SECRET
    }, (payload, done) => {
        try {
            const user = User.findById(payload.sub);
            if (!user) {
                return (done, flase);
            }

            done(null, user);
        }
        catch (err) {
            done(err, false);
        }
    }));

    passport.use('googleToken', new GooglePlusTokenStrategy({
        //callbackURL: '/users/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (acessToken, refreshToken, profile, done) => {
        try {
            console.log(acessToken);
            console.log(refreshToken);
            console.log(profile);

            const existingUser = User.findOne({ "googleId": profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            const newUser = new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            });

            newUser.save();
            done(null, newUser);
        } catch (err) {
            done(err, false, err.message);
        }
    }));

    // passport.use(
    //     new GoogleStrategy({
    //         // options for google strategy
    //         callbackURL: '/api/auth/google/redirect',
    //         clientID: keys.google.clientID,
    //         clientSecret: keys.google.clientSecret
    //     }, (acessToken, refreshToken, profile, done) => {
    //         // passport callback function
    //         // console.log("passport callback function fired");
    //         console.log(profile);
    //         console.log("---------------");
    //         console.log(profile.emails[0]['value']);
    //         console.log('--------------------------------');
    //         console.log('accesstoken', acessToken);

    //         //check if user already exists in our db
    //         User.findOne({ googleId: profile.id }).then((currentUser) => {

    //             if (currentUser) {
    //                 //already have a user
    //                 console.log('user is: '+ currentUser);
    //                 done(null, currentUser);
    //             }
    //             else {
    //                 //if not create user in our db
    //                 new User({
    //                     username: profile.displayName,
    //                     googleId: profile.id,
    //                     email: profile.emails[0]['value']
    //                 }).save().then((newUser) => {
    //                     console.log("New user created: " + newUser);
    //                     done(null, newUser);
    //                 });
    //             }
    //         });



    //     })
    // );