const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(reviewController.getReviews));
router.get('/reviews', catchErrors(reviewController.getReviews));

router.get('/add', reviewController.addReview);
router.post('/add', catchErrors(reviewController.createReview));

module.exports = router;