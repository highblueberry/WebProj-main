const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.route('/addReview')
    .get(reviewController.addReviewForm)
    // .post(reviewController.createReview);
    
module.exports = router;