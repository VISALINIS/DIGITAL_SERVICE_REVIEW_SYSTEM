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
        "Programming",
        "Competitive Exams",
        "School Learning",
        "College Resources",
        "Skill Development",
        "Language Learning",
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ["Free", "Paid", "Freemium"],
      default: "Free",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
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
