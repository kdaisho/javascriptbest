const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = (req, res) => {
    res.render('login');
};

exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

exports.sendMessage = async (req, res) => {
    // Honeypot
    if (req.body.address) {
        req.flash('error', 'You must be a robot!');
        res.redirect('/contact');
        return;
    }

    const sender = {
        name: req.body.name,
        email: req.body.email,
        msg: req.body.message,
        copy: req.body.receiveCopy
    };

    await mail.send({
        to: 'daishokomiyama@gmail.com',
        filename: 'emails',
        subject: 'Message from app',
        sender,
        fromContact: true
    });

    req.flash('success', `Message has been sent successfully!`);
    res.redirect('/contact');
};

exports.privacy = (req, res) => {
    res.render('privacy-policy');
};