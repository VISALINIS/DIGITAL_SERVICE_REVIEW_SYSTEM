const express = require("express");
const {
  getDashboardAnalytics,
  getUsersManagement,
  updateUserRole,
  deletePlatform,
} = require("../controllers/admin.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth");

const router = express.Router();

// Protect all admin routes with auth and admin check
router.use(authMiddleware);
router.use(adminOnly);

// Dashboard analytics
router.get("/dashboard", getDashboardAnalytics);

// User management
router.get("/users", getUsersManagement);
router.put("/users/:userId/role", updateUserRole);

// Platform management
router.delete("/platforms/:platformId", deletePlatform);

module.exports = router;
