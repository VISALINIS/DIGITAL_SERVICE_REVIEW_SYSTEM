const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Education",
        "Entertainment",
        "Finance",
        "E-commerce",
        "Social Media",
        "Productivity",
        "Health & Fitness",
        "Travel",
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ["Free", "Paid", "Freemium", "Subscription"],
      default: "Free",
    },
    website: {
      type: String,
      default: null,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Platform", platformSchema);
