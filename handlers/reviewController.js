exports.homePage = async (req, res) => {
    res.render('reviews', { title: 'Reviews' });
};