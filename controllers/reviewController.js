const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.homePage = async (req, res) => {
    res.render('reviews', { title: 'Reviews' });
};

exports.addReview = (req, res) => {
    res.render('editReview', { title: 'Add Review' });
};

exports.createReview = async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    req.flash('success', `Successfully created ${review.course}!`);
    res.redirect('/');
};