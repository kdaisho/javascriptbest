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
        required: 'Please supply a course name'
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

function autoPopulate (next) {
    this.populate('author');
    next();
}

reviewSchema.pre('find', autoPopulate);
reviewSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Review', reviewSchema);