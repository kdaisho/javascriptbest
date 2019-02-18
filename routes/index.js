const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(courseController.getCourses));
router.get('/courses', catchErrors(courseController.getCourses));
router.get('/add', authController.isLoggedIn, courseController.addCourse);
router.post('/add',
    courseController.upload,
    catchErrors(courseController.resize),
    catchErrors(courseController.createCourse)
);
router.post('/add/:id',
    courseController.upload,
    catchErrors(courseController.resize),
    catchErrors(courseController.updateCourse)
);

router.get('/courses/:id/edit', catchErrors(courseController.editCourse));

router.get('/course/:slug', catchErrors(courseController.getCourseBySlug));

router.get('/tags', catchErrors(courseController.getCourseByTag));
router.get('/tags/:tag', catchErrors(courseController.getCourseByTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/signup', userController.signupForm);

// 1. Validate the registration data
// 2. Register the user
// 3. Log them in
router.post('/signup',
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update)
);
router.get('/likes', authController.isLoggedIn, catchErrors(courseController.getLikes));

router.get('/api/search', catchErrors(courseController.searchCourses));
router.post('/api/courses/:id/like', catchErrors(courseController.likeCourse));

module.exports = router;