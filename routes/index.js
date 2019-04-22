const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');
// Do work here
// router.get('/', (req, res) => { res.redirect('/courses') });
// router.get('/', (req, res) => {
//     // res.render('courses', { title: 'Hahaha', siteName: 'Max' });
//     res.render('courses', { title: 'ALl Courses' });
// });
router.get('/', (req, res) => { res.redirect('/courses') });
router.get('/courses', catchErrors(courseController.getCourses));
router.get('/courses/page/:page', catchErrors(courseController.getCourses));

router.get('/course/:slug', catchErrors(courseController.getCourseBySlug));


router.get('/signup', userController.signupForm);
router.post('/signup',
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/popular', catchErrors(courseController.getPopularCourses));

module.exports = router;