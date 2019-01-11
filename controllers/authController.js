const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login failed',
    successRedirect: '/',
    successFlash: 'Woohoo! You are now logged in'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out!');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    req.flash('error', 'Oops! You must be logged in to do that!');
    res.redirect('/login');
};

exports.forgot = async (req, res) => {
    // 1. See if the user with that email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'No account with that email exists.');
        return res.redirect('/login');
    }
    // 2. Set reset tokens and expiry
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();
    // 3. Send them an email with the token
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    req.flash('success', `You have been emailed a password reset link. ${resetURL}`);
    // 4. Redirect to login page
    res.redirect('/login');
};