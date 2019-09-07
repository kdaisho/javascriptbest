const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const oauthUserSchema = new Schema({
    username: String,
    googleId: String
});

const userSchema = new Schema({
    googleId: String,
    // email: {
    //     type: String,
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    //     validate: [validator.isEmail, 'Invalid Email Address'],
    //     required: 'Please supply an email address'
    // },
    name: {
        type: String
        // unique: true
        // required: 'Please supply a name',
        // trim: true
    },
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        }
    ]
});

// userSchema.virtual('gravatar').get(function() {
//     const hash = md5(this.email);
//     return `https://gravatar.com/avatar/${hash}?s=200&d=monsterid`;
// });
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', oauthUserSchema);

// !!mongoose.Promise is commented out (see the top)