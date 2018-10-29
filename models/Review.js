const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const reviewSchema = new mongoose.Schema({
    course: {
        type: String,
        trim: true,
        required: 'Please enter a course title!'
    },
    instructor: {
        type: String,
        trim: true,
        required: 'Please enter an instructor name!'
    },
    slug: String,
    review: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);