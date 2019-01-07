const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(reviewController.getReviews));
router.get('/reviews', catchErrors(reviewController.getReviews));
router.get('/add', reviewController.addReview);
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
router.get('/signup', userController.signupForm);

// 1. Validate the registration data
// 2. Register the user
// 3. Log them in
router.post('/signup',
    userController.validateRegister
);

module.exports = router;