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
        msg: req.body.message
    };

    await mail.send({
        to: 'daishokomiyama@gmail.com',
        filename: 'emails',
        subject: 'Message from JavaScriptBest',
        sender
    });

    req.flash('success', `Message has been sent successfully!`);
    res.redirect('/contact');
};

exports.privacy = (req, res) => {
    res.render('privacy-policy');
};