const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const fs = require('fs');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const generateHTML = (filename, options = {}) => {
    const src = fs.readFileSync(`${__dirname}/../views/email/${filename}.hbs`, 'utf8');
    const template = Handlebars.compile(src);
    const html = template(options);
    const inlined = juice(html);
    return inlined;
};

exports.send = async (options) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);
    let dest = '';

    if (options.fromContact && options.sender.copy) {
        dest = options.sender.email;
    }
    else if (!options.fromContact) {
        dest = options.user.email;
    }

    mailOptions = {
        from: `Daisho <noreply@daishokomiyama@gmail.com>`,
        to: dest,
        bcc: 'daishokomiyama@gmail.com',
        subject: options.subject,
        html,
        text
    };

    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions)
};