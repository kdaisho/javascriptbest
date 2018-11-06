const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
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

module.exports = router;