const crypto = require('crypto');
const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const promisify = require('es6-promisify');
// const mail = require('../handlers/mail');

exports.oauthLogin = (req, res) => {
    req.session.passport.user = req.user;
    req.flash('success', 'You are now logged in!');
    res.redirect('/');
}

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