import React from "react";
import "../styles/AdminStats.css";

export default function AdminStats({ totalCounts }) {
  return (
    <div className="admin-stats">
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <h3>Total Users</h3>
          <p className="stat-number">{totalCounts.totalUsers}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-content">
          <h3>Total Platforms</h3>
          <p className="stat-number">{totalCounts.totalPlatforms}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-content">
          <h3>Total Reviews</h3>
          <p className="stat-number">{totalCounts.totalReviews}</p>
        </div>
      </div>
    </div>
  );
}
