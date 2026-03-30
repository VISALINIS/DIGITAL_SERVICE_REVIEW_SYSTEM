const express = require("express");
const {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platform.controller");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getAllPlatforms);
router.get("/:id", getPlatformById);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, createPlatform);
router.put("/:id", authMiddleware, adminMiddleware, updatePlatform);
router.delete("/:id", authMiddleware, adminMiddleware, deletePlatform);

module.exports = router;
