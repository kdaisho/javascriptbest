const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.signupForm = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};