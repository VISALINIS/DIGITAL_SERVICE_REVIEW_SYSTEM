import React from "react";
import "../styles/TopRatedServices.css";

const TopRatedServices = ({ platforms, onServiceClick }) => {
  // Sort by rating and get top 8
  const topServices = [...platforms]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 8);

  if (topServices.length === 0) {
    return null;
  }

  return (
    <section className="top-rated-section">
      <div className="section-header">
        <h2>⭐ Top Rated Services</h2>
        <p>Discover the highest-rated services across all categories</p>
      </div>

      <div className="top-rated-grid">
        {topServices.map((service) => (
          <div
            key={service._id}
            className="top-rated-card"
            onClick={() => onServiceClick(service._id)}
          >
            <div className="card-badge">
              <span className="rating-badge">{service.averageRating.toFixed(1)}</span>
              <span className="star-icon">⭐</span>
            </div>

            <div className="card-content">
              <h3>{service.name}</h3>
              <p className="card-category">{service.category}</p>
              <p className="card-type">{service.type}</p>
            </div>

            <div className="card-footer">
              <span className="review-count">{service.totalReviews} reviews</span>
              <span className="arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedServices;
