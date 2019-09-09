const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    googleId: String,
    name: String,
    thumbnail: String,
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
// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// userSchema.plugin(mongodbErrorHandler);

userSchema.virtual('gravatar').get(function() {
    return this.thumbnail;
});
// userSchema.plugin(passportLocalMongoose, { usernameField: 'thumbnail' });

module.exports = mongoose.model('User', userSchema);

// !!mongoose.Promise is commented out (see the top)