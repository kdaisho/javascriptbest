const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

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

userSchema.virtual('gravatar').get(function() {
    return this.thumbnail;
});

module.exports = mongoose.model('User', userSchema);