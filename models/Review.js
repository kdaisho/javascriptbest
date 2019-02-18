const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'Please supply an author'
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: 'Please supply a course'
    },
    text: {
        type: String,
        required: 'Please write your review'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Review', reviewSchema);