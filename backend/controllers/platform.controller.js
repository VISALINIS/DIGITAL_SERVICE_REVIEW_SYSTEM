const Platform = require("../models/Platform");
const Review = require("../models/Review");

// Get all platforms
const getAllPlatforms = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const platforms = await Platform.find(filter).sort({ createdAt: -1 });
    res.status(200).json(platforms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single platform
const getPlatformById = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({ error: "Platform not found" });
    }

    const reviews = await Review.find({ platformId: platform._id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ platform, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create platform (Admin only)
const createPlatform = async (req, res) => {
  try {
    const { name, description, category, type, website } = req.body;

    // Validation
    const validCategories = [
      "Education",
      "Entertainment",
      "Finance",
      "E-commerce",
      "Social Media",
      "Productivity",
      "Health & Fitness",
      "Travel",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    if (!["Free", "Paid", "Freemium", "Subscription"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const platform = new Platform({
      name,
      description,
      category,
      type,
      website: website || null,
      averageRating: 0,
      totalReviews: 0,
    });

    await platform.save();
    res.status(201).json(platform);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update platform
const updatePlatform = async (req, res) => {
  try {
    const { name, description, category, type, website } = req.body;

    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({ error: "Platform not found" });
    }

    if (name) platform.name = name;
    if (description) platform.description = description;
    if (category) platform.category = category;
    if (type) platform.type = type;
    if (website !== undefined) platform.website = website;

    await platform.save();
    res.status(200).json(platform);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete platform
const deletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    if (!platform) {
      return res.status(404).json({ error: "Platform not found" });
    }

    // Delete all reviews for this platform
    await Review.deleteMany({ platformId: platform._id });

    res.status(200).json({ message: "Platform deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
