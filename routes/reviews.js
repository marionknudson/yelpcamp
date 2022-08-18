const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const reviews = require('../controllers/reviews');
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require('../middleware.js');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.addNewReview));

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
