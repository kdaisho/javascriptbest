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
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    }
});

reviewSchema.pre('save', function(next) {
    if (!this.isModified('course')) {
        next();
        return;
    }
    this.slug = slug(this.course);
    next();
    // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Review', reviewSchema);