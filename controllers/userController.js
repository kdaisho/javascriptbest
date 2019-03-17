const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.signupForm = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name').notEmpty();
    req.checkBody('email', 'Please supply a valid email address').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Pasword cannot be blank').notEmpty();
    req.checkBody('password-confirm', 'Confirmed password cannot be blank').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('signup', { title: 'Sign Up', body: req.body, flashes: req.flash() });
        return;
    }
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next();
};

exports.account = (req, res) => {
    res.render('account', { title: 'Edit Your Account' });
};

exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

exports.sendMessage = async (req, res) => {
    // Honeypot
    if (req.body.address) return false;

    const sender = {
        name: req.body.name,
        email: req.body.email,
        msg: req.body.message,
        copy: req.body.receiveCopy
    };

    await mail.send({
        to: 'daishokomiyama@gmail.com',
        filename: 'contact-message',
        subject: 'Message from app',
        sender,
        fromContact: true
    });

    req.flash('success', `Message has been sent successfully!`);
    res.redirect('/contact');
};

exports.updateAccount = async (req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );

    req.flash('success', 'Updated your profile!');
    res.redirect('back');
};