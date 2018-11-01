const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', reviewController.homePage);
router.get('/reviews', reviewController.homePage);

router.get('/add', reviewController.addReview);
router.post('/add', catchErrors(reviewController.createReview));

module.exports = router;