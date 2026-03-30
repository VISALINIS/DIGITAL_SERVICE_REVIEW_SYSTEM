const User = require("../models/User");
const Platform = require("../models/Platform");
const Review = require("../models/Review");

// Get comprehensive dashboard analytics
const getDashboardAnalytics = async (req, res) => {
  try {
    // 1. TOTAL COUNTS
    const totalUsers = await User.countDocuments();
    const totalPlatforms = await Platform.countDocuments();
    const totalReviews = await Review.countDocuments();

    // 2. CATEGORY-WISE STATS
    const categoryStats = await Platform.aggregate([
      {
        $group: {
          _id: "$category",
          platforms: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "reviews",
          let: { platformId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$platformId", []] },
              },
            },
            {
              $group: {
                _id: null,
                totalReviews: { $sum: 1 },
                averageRating: { $avg: "$rating" },
              },
            },
          ],
          as: "reviewData",
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          platforms: 1,
          totalReviews: {
            $cond: [
              { $gt: [{ $size: "$reviewData" }, 0] },
              { $arrayElemAt: ["$reviewData.totalReviews", 0] },
              0,
            ],
          },
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviewData" }, 0] },
              {
                $round: [
                  { $arrayElemAt: ["$reviewData.averageRating", 0] },
                  1,
                ],
              },
              0,
            ],
          },
        },
      },
      { $sort: { category: 1 } },
    ]);

    // Better approach for category stats
    const categoryStatsImproved = await Platform.aggregate([
      {
        $group: {
          _id: "$category",
          platformIds: { $push: "$_id" },
          platformCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "platformIds",
          foreignField: "platformId",
          as: "reviews",
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          platforms: "$platformCount",
          totalReviews: { $size: "$reviews" },
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              {
                $round: [
                  { $avg: "$reviews.rating" },
                  1,
                ],
              },
              0,
            ],
          },
        },
      },
      { $sort: { category: 1 } },
    ]);

    // 3. PLATFORM-WISE STATS
    const platformStats = await Platform.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "platformId",
          as: "reviews",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          totalReviews: { $size: "$reviews" },
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              {
                $round: [{ $avg: "$reviews.rating" }, 1],
              },
              0,
            ],
          },
        },
      },
      { $sort: { name: 1 } },
    ]);

    // 4. TOP RATED PLATFORMS
    const topRatedPlatforms = await Platform.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "platformId",
          as: "reviews",
        },
      },
      {
        $match: { "reviews.0": { $exists: true } },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          averageRating: {
            $round: [{ $avg: "$reviews.rating" }, 1],
          },
          totalReviews: { $size: "$reviews" },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 5 },
    ]);

    // 5. MOST REVIEWED PLATFORMS
    const mostReviewedPlatforms = await Platform.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "platformId",
          as: "reviews",
        },
      },
      {
        $match: { "reviews.0": { $exists: true } },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          totalReviews: { $size: "$reviews" },
          averageRating: {
            $round: [{ $avg: "$reviews.rating" }, 1],
          },
        },
      },
      { $sort: { totalReviews: -1 } },
      { $limit: 5 },
    ]);

    // 6. RECENT REVIEWS
    const recentReviews = await Review.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "platforms",
          localField: "platformId",
          foreignField: "_id",
          as: "platform",
        },
      },
      {
        $project: {
          _id: 1,
          userName: { $arrayElemAt: ["$user.username", 0] },
          platformName: { $arrayElemAt: ["$platform.name", 0] },
          rating: 1,
          comment: 1,
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCounts: {
          totalUsers,
          totalPlatforms,
          totalReviews,
        },
        categoryStats: categoryStatsImproved,
        platformStats,
        topRatedPlatforms,
        mostReviewedPlatforms,
        recentReviews,
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: err.message,
    });
  }
};

// Get user management data
const getUsersManagement = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role, isAdmin: role === "admin" },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating user role",
      error: err.message,
    });
  }
};

// Delete platform (admin only)
const deletePlatform = async (req, res) => {
  try {
    const { platformId } = req.params;

    // Delete all reviews for this platform
    await Review.deleteMany({ platformId });

    // Delete platform
    const platform = await Platform.findByIdAndDelete(platformId);

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Platform deleted successfully",
      data: platform,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting platform",
      error: err.message,
    });
  }
};

module.exports = {
  getDashboardAnalytics,
  getUsersManagement,
  updateUserRole,
  deletePlatform,
};
