const Review = require("../models/Review");
const Platform = require("../models/Platform");

// Helper function to recalculate platform ratings
const recalcuratePlatformRatings = async (platformId) => {
  const platform = await Platform.findById(platformId);
  if (!platform) return;

  const allReviews = await Review.find({ platformId });

  if (allReviews.length > 0) {
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    platform.averageRating = Math.round(avgRating * 10) / 10;
  } else {
    platform.averageRating = 0;
  }

  platform.totalReviews = allReviews.length;
  await platform.save();
};

// Get all reviews for a platform
const getReviewsByPlatform = async (req, res) => {
  try {
    const reviews = await Review.find({ platformId: req.params.platformId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's review for a specific platform
const getUserPlatformReview = async (req, res) => {
  try {
    const { platformId } = req.params;
    const userId = req.userId;

    const review = await Review.findOne({
      platformId,
      userId,
    }).populate("userId", "username");

    if (!review) {
      return res.status(404).json({ message: "No review found" });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new review (only one per user per platform)
const createReview = async (req, res) => {
  try {
    const { platformId, rating, comment } = req.body;
    const userId = req.userId;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if platform exists
    const platform = await Platform.findById(platformId);
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      platformId,
      userId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this platform. Please edit your review.",
      });
    }

    // Create new review
    const review = new Review({
      platformId,
      userId,
      rating,
      comment: comment || "",
    });

    await review.save();
    await review.populate("userId", "username");

    // Recalculate platform ratings
    await recalcuratePlatformRatings(platformId);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Find review and verify ownership
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own reviews",
      });
    }

    // Update review
    review.rating = rating;
    review.comment = comment || "";
    await review.save();
    await review.populate("userId", "username");

    // Recalculate platform ratings
    await recalcuratePlatformRatings(review.platformId);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Verify ownership
    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    const platformId = review.platformId;
    await Review.findByIdAndDelete(reviewId);

    // Recalculate platform stats
    await recalcuratePlatformRatings(platformId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getReviewsByPlatform,
  getUserPlatformReview,
  createReview,
  updateReview,
  deleteReview,
};
