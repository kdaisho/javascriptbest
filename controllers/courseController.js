const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const User = mongoose.model('User');
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

exports.getHomepage = async (req, res) => {
    const count = await Course.find();
    res.render('home', { title: 'Welcome to Frontend Reviews', count: count.length });
};

exports.addCourse = (req, res) => {
    const course = {};
    const tags = [];
    res.render('addEditCourse', { title: 'Add Course', course, tags });
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

exports.createCourse = async (req, res) => {
    req.body.author = req.user._id;
    const course = new Course(req.body);
    await course.save();
    req.flash('success', `Successfully created ${course.course}!`);
    res.redirect('/');
};

exports.getCourses = async (req, res) => {
    const page = req.params.page || 1;
    const coursesPerPage = 10;
    const numberOfSkip = (page * coursesPerPage) - coursesPerPage;

    const coursesPromise = Course
        .find()
        .skip(numberOfSkip)
        .limit(coursesPerPage)
        .sort({ created: 'desc' })
        .populate('reviews');
    const countPromise = Course.count();

    const [courses, count] = await Promise.all([coursesPromise, countPromise]);
    const pages = Math.ceil(count / coursesPerPage);

    if (!courses.length && numberOfSkip) {
        res.redirect(`/courses/page/${pages}`);
        return;
    }

    res.render('courses', { title: 'All Reviews', courses, page, pages, count });
};

const confirmOwner = (course, user) => {
    if (!course.author.equals(user._id)) {
        throw Error('You must be the one who created this review!');
    }
};

exports.editCourse = async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id });
    const tags = course.tags;
    confirmOwner(course, req.user);
    res.render('addEditCourse', { title: `Edit ${course.course}`, course, tags });
};

exports.updateCourse = async (req, res) => {
    const course = await Course.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, //Return the new course instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated <strong>${course.course}</strong>. <a href="/courses/${course.slug}">View Course</a>`);
    res.redirect(`/courses/${course._id}/edit`);
};

exports.getCourseBySlug = async (req, res, next) => {
    const course = await Course.findOne({ slug: req.params.slug }).populate('author reviews');
    if (!course) return next();
    res.render('course', { title: course.course, course });
};

exports.getCourseByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Course.getTagsList();
    const coursesPromise = Course.find({ tags: tagQuery }).populate('reviews');
    const [tags, courses] = await Promise.all([tagsPromise, coursesPromise]);
    res.render('tag', { tags, title: 'Tags', tag, courses });
};

exports.searchCourses = async (req, res) => {
    const courses = await Course
    .find({
        $text: {
            $search: req.query.q
        }
    }, {
        score: { $meta: 'textScore' }
    })
    .sort({
        score: { $meta: 'textScore' }
    })
    .limit(5);
    res.json(courses);
};

exports.likeCourse = async (req, res) => {
    const likes = req.user.likes.map(obj => obj.toString());
    const operator = likes.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.findByIdAndUpdate(req.user._id,
        { [operator]: { likes: req.params.id }},
        { new: true }
    );
    res.send(user);
};

exports.getLikes = async (req, res) => {
    const courses = await Course.find({
        _id: { $in: req.user.likes }
    }).populate('reviews');
    res.render('courses', { title: 'Liked Courses', courses });
};

exports.getPopularCourses = async (req, res) => {
    const courses = await Course.getPopularCourses();
    // res.json(courses);
    res.render('popularCourses', { courses, title: 'Popular Courses' });
};

exports.addReview = async (req, res) => {
    req.body.author = req.user._id;
    req.body.course = req.params.id;
    const newReview = new Review(req.body);
    await newReview.save();
    req.flash('success', 'Done!');
    res.redirect('back');
};