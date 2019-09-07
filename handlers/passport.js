const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

// passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, id);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the google strat
        clientID: process.env.clientId,
        clientSecret: process.env.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                console.log('current user exsits: ', currentUser);
                done(null, currentUser);
            }
            else {
                console.log('passport cb fired', profile);
                new User({
                    name: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created', newUser);
                    done(null, newUser);
                });
            }
        })
    })
);

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());