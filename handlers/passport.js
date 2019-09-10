const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
    new GoogleStrategy({
        clientID: process.env.clientId,
        clientSecret: process.env.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({googleId: profile.id});
        if (currentUser) {
            done(null, currentUser);
        }
        else {
            const newUser = await User({
                name: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.picture
            });
            done(null, newUser);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    await User.findById(id) ? done(null, id) : '';
});