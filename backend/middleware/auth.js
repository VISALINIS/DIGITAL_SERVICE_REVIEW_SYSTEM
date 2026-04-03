const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: "No token, authorization denied" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    req.userRole = decoded.role || "user";
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      error: "Token is not valid" 
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.isAdmin && req.userRole !== "admin") {
    return res.status(403).json({ 
      success: false,
      message: "Admin access only",
      error: "Access denied. Admin only." 
    });
  }
  next();
};

const protectRoute = authMiddleware;
const adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ 
      success: false,
      message: "Admin access only",
      error: "Access denied. Admin only." 
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, protectRoute, adminOnly };
