const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
    new GoogleStrategy({
        clientID: process.env.clientId,
        clientSecret: process.env.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({userId: profile.id}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            }
            else {
                new User({
                    name: profile.displayName,
                    userId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        })
    })
);

passport.use(
    new GithubStrategy ({
        clientID: process.env.clientIdGithub,
        clientSecret: process.env.clientSecretGithub,
        callbackURL: '/auth/github/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({userId: profile.id}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            }
            else {
                new User({
                    name: profile.displayName,
                    userId: profile.id,
                    thumbnail: profile._json.avatar_url
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        })
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    await User.findById(id) ? done(null, id) : '';
});