import React from "react";
import "../styles/PlatformCard.css";

const PlatformCard = ({ platform, onClick }) => {
  return (
    <div className="platform-card" onClick={onClick}>
      <div className="card-header">
        <h3>{platform.name}</h3>
        <span className={`type-badge type-${platform.type.toLowerCase()}`}>
          {platform.type}
        </span>
      </div>
      <p className="category">
        <strong>Category:</strong> {platform.category}
      </p>
      <p className="level">
        <strong>Level:</strong> {platform.level}
      </p>
      <div className="rating-section">
        <div className="stars">
          {"⭐".repeat(Math.floor(platform.averageRating))}
          {platform.averageRating % 1 !== 0 && "✨"}
        </div>
        <span className="rating-value">
          {platform.averageRating.toFixed(1)} ({platform.totalReviews} reviews)
        </span>
      </div>
    </div>
  );
};

export default PlatformCard;
