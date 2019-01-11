const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(reviewController.getReviews));
router.get('/reviews', catchErrors(reviewController.getReviews));
router.get('/add', authController.isLoggedIn, reviewController.addReview);
router.post('/add',
    reviewController.upload,
    catchErrors(reviewController.resize),
    catchErrors(reviewController.createReview)
);
router.post('/add/:id',
    reviewController.upload,
    catchErrors(reviewController.resize),
    catchErrors(reviewController.updateReview)
);

router.get('/reviews/:id/edit', catchErrors(reviewController.editReview));

router.get('/review/:slug', catchErrors(reviewController.getReviewBySlug));

router.get('/tags', catchErrors(reviewController.getReviewByTag));
router.get('/tags/:tag', catchErrors(reviewController.getReviewByTag));

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

module.exports = router;