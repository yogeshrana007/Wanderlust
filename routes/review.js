const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review.js");
const reviewController = require("../controllers/reviews.js");

const {
    validateReview,
    isLoggedIn,
    isOwner,
    isReviewAuthor,
} = require("../middleware.js");

// Reviews route post
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

// delete review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,

    wrapAsync(reviewController.destroyReview)
);

module.exports = router;
