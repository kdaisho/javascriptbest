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
    url: {
        type: String,
        trim: true,
        required: 'Please enter URL!'
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
    },
    image: String
});

reviewSchema.pre('save', async function(next) {
    if (!this.isModified('course')) {
        next();
        return;
    }
    this.slug = slug(this.course);
    // Find other reviews that have a slug of example, example-1, example-2
    const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const reviewsWithSlug = await this.constructor.find({ slug: slugRegExp });
    if (reviewsWithSlug.length) {
        this.slug = `${this.slug}-${reviewsWithSlug.length + 1}`;
    }
    next();
    // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Review', reviewSchema);