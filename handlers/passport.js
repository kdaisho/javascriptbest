const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
console.log(GoogleStrategy);
const mongoose = require('mongoose');
const User = mongoose.model('User');

// passport.use(User.createStrategy());
passport.use(
    new GoogleStrategy({
        // options for the google strat
        consumerKey: process.env.clientId,
        consumerSecret: process.env.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, () => {
        // passport callback
    })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());