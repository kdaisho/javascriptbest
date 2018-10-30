const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Do work here
router.get('/', reviewController.homePage);
router.get('/reviews', reviewController.homePage);

router.get('/add', reviewController.addReview);

module.exports = router;