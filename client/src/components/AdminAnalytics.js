import React, { useState } from "react";
import "../styles/AdminAnalytics.css";

export default function AdminAnalytics({ analytics }) {
  const [activeTab, setActiveTab] = useState("category");

  const renderStarRating = (rating) => {
    const stars = Math.round(rating);
    return "⭐".repeat(stars) + (rating > stars ? "✨" : "");
  };

  return (
    <div className="admin-analytics">
      {/* Category Analytics */}
      <section className="analytics-section">
        <h2>📊 Category-Wise Analytics</h2>
        <div className="table-responsive">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Platforms</th>
                <th>Total Reviews</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {analytics.categoryStats.map((cat) => (
                <tr key={cat.category}>
                  <td className="category-name">{cat.category}</td>
                  <td className="text-center">{cat.platforms}</td>
                  <td className="text-center">{cat.totalReviews}</td>
                  <td className="rating-cell">
                    {cat.averageRating > 0
                      ? renderStarRating(cat.averageRating)
                      : "No reviews"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Platform Analytics */}
      <section className="analytics-section">
        <h2>📚 Platform-Wise Analytics</h2>
        <div className="table-responsive">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Platform Name</th>
                <th>Category</th>
                <th>Reviews</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {analytics.platformStats.map((platform) => (
                <tr key={platform._id}>
                  <td className="platform-name">{platform.name}</td>
                  <td>{platform.category}</td>
                  <td className="text-center">{platform.totalReviews}</td>
                  <td className="rating-cell">
                    {platform.averageRating > 0
                      ? renderStarRating(platform.averageRating)
                      : "No reviews"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Platforms */}
      <div className="top-platforms-container">
        <section className="analytics-section half-width">
          <h2>🏆 Top Rated Platforms</h2>
          <div className="platforms-list">
            {analytics.topRatedPlatforms.length > 0 ? (
              analytics.topRatedPlatforms.map((platform, idx) => (
                <div key={platform._id} className="platform-item">
                  <span className="rank-badge">{idx + 1}</span>
                  <div className="platform-info">
                    <p className="platform-name">{platform.name}</p>
                    <p className="platform-category">{platform.category}</p>
                  </div>
                  <div className="platform-stats">
                    <span className="rating">
                      {renderStarRating(platform.averageRating)}
                    </span>
                    <span className="reviews">({platform.totalReviews})</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No platforms with ratings yet</p>
            )}
          </div>
        </section>

        <section className="analytics-section half-width">
          <h2>📝 Most Reviewed Platforms</h2>
          <div className="platforms-list">
            {analytics.mostReviewedPlatforms.length > 0 ? (
              analytics.mostReviewedPlatforms.map((platform, idx) => (
                <div key={platform._id} className="platform-item">
                  <span className="rank-badge">{idx + 1}</span>
                  <div className="platform-info">
                    <p className="platform-name">{platform.name}</p>
                    <p className="platform-category">{platform.category}</p>
                  </div>
                  <div className="platform-stats">
                    <span className="reviews">{platform.totalReviews} reviews</span>
                    <span className="rating">
                      {renderStarRating(platform.averageRating)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No reviews yet</p>
            )}
          </div>
        </section>
      </div>

      {/* Recent Reviews */}
      <section className="analytics-section">
        <h2>📋 Recent Reviews</h2>
        <div className="reviews-list">
          {analytics.recentReviews.length > 0 ? (
            analytics.recentReviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <span className="user-name">👤 {review.userName}</span>
                  <span className="platform-name">📚 {review.platformName}</span>
                </div>
                <div className="review-rating">
                  {renderStarRating(review.rating)}
                </div>
                <div className="review-comment">{review.comment}</div>
                <div className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No reviews yet</p>
          )}
        </div>
      </section>
    </div>
  );
}
