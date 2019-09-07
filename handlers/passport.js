const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
console.log('WHAT', GoogleStrategy);
const mongoose = require('mongoose');
const User = mongoose.model('User');

// passport.use(User.createStrategy());
passport.use(
    new GoogleStrategy({
        // options for the google strat
        clientID: process.env.clientId,
        clientSecret: process.env.clientSecret,
        // callbackURL: 'localhost:8080/auth/google/redirect'
        callbackURL: '/auth/google/redirect'
    }, () => {
        // passport callback

    })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());