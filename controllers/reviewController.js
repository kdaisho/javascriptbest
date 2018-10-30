exports.homePage = async (req, res) => {
    res.render('reviews', { title: 'Reviews' });
};

exports.addReview = (req, res) => {
    res.render('editReview', { title: 'Add Review' });
};