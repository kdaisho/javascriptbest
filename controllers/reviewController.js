const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: function(req, file, callback) {
        const isImage = file.mimetype.startsWith('image/');
        if (isImage) {
            callback(null, true);
        }
        else {
            callback({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};

// exports.homePage = async (req, res) => {
//     res.render('reviews', { title: 'Reviews' });
// };

exports.addReview = (req, res) => {
    res.render('editReview', { title: 'Add Review' });
};

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.image = `${uuid.v4()}.${extension}`;
    // Resize image
    const img = await jimp.read(req.file.buffer);
    await img.resize(400, jimp.AUTO);
    await img.write(`./public/uploads/${req.body.image}`);
    next();
};

exports.createReview = async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    req.flash('success', `Successfully created ${review.course}!`);
    res.redirect('/');
};

exports.getReviews = async (req, res) => {
    const reviews = await Review.find();
    res.render('reviews', { title: 'Reviews', reviews });
};

exports.editReview = async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    res.render('editReview', { title: `Edit ${review.course}`, review });
};

exports.updateReview = async (req, res) => {
    const review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, //Return the new review instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated <strong>${review.course}</strong>. <a href="/reviews/${review.slug}">View Review</a>`);
    res.redirect(`/reviews/${review._id}/edit`);
};

exports.getReviewBySlug = async (req, res, next) => {
    const review = await Review.findOne({ slug: req.params.slug });
    if (!review) return next();
    res.render('single', { title: review.course, review });
};

exports.getReviewByTag = async (req, res) => {
    const tags = await Review.getTagsList();
    res.render('tag', { tags, title: 'Tags' });
};