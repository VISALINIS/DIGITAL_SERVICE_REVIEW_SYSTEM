const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Ensure one user can only have one review per platform
reviewSchema.index({ platformId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
