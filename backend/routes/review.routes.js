const express = require("express");
const {
  getReviewsByPlatform,
  getUserPlatformReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Get all reviews for a platform (public)
router.get("/:platformId", getReviewsByPlatform);

// Get user's review for a specific platform (authenticated)
router.get("/user/:platformId", authMiddleware, getUserPlatformReview);

// Create new review (authenticated, one per user per platform)
router.post("/", authMiddleware, createReview);

// Update review (authenticated, user's own review only)
router.put("/:reviewId", authMiddleware, updateReview);

// Delete review (authenticated, user's own review only)
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
