import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "../styles/PlatformDetails.css";

const PlatformDetails = ({ platformId, onBack }) => {
  const { user, token } = useContext(AuthContext);
  const [platform, setPlatform] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    loadPlatformDetails();
  }, [platformId]);

  useEffect(() => {
    if (user && platformId) {
      fetchUserReview();
    }
  }, [user, platformId, token]);

  const loadPlatformDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/platforms/${platformId}`
      );
      if (!response.ok) throw new Error("Failed to load platform");
      const data = await response.json();
      setPlatform(data.platform);
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/user/${platformId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const review = await response.json();
        setUserReview(review);
      } else if (response.status === 404) {
        setUserReview(null);
      }
    } catch (err) {
      console.error("Failed to fetch user review", err);
    }
  };

  const handleReviewSubmitted = () => {
    setIsEditMode(false);
    loadPlatformDetails();
    fetchUserReview();
  };

  const handleEditReview = (review) => {
    setUserReview(review);
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  if (loading) {
    return <div className="loading">Loading platform details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={onBack} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  if (!platform) {
    return (
      <div className="error-container">
        <div className="error-message">Platform not found</div>
        <button onClick={onBack} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="platform-details-container">
      <button onClick={onBack} className="back-btn">
        ← Back to Platforms
      </button>

      <div className="details-header">
        <h1>{platform.name}</h1>
        <div className="details-meta">
          <span className={`type-badge type-${platform.type.toLowerCase()}`}>
            {platform.type}
          </span>
          <span className="level-badge">{platform.level}</span>
          <span className="category-badge">{platform.category}</span>
        </div>
      </div>

      <div className="details-content">
        <div className="details-description">
          <h2>About this Platform</h2>
          <p>{platform.description}</p>

          {platform.website && (
            <div className="website-link">
              <strong>Website:</strong>
              <a
                href={platform.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform.website}
              </a>
            </div>
          )}

          <div className="rating-info">
            <h3>Rating & Reviews</h3>
            <div className="rating-display">
              <div className="stars">
                {"⭐".repeat(Math.floor(platform.averageRating))}
                {platform.averageRating % 1 !== 0 && "✨"}
              </div>
              <div className="rating-stats">
                <span className="avg-rating">
                  {platform.averageRating.toFixed(1)}
                </span>
                <span className="total-reviews">
                  ({platform.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-reviews">
          {user && userReview && !isEditMode ? (
            <div className="user-review-status">
              <div className="status-message">
                ✅ You have already reviewed this platform
              </div>
              <div className="user-review-preview">
                <div className="review-preview-header">
                  <span className="reviewer-name">Your Review</span>
                  <span className="review-rating">
                    {"⭐".repeat(userReview.rating)}
                  </span>
                </div>
                {userReview.comment && (
                  <p className="review-preview-comment">{userReview.comment}</p>
                )}
                <div className="review-preview-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditReview(userReview)}
                  >
                    ✏️ Edit Your Review
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {!user ? (
            <div className="login-prompt-box">
              <p>Please login to add a review</p>
            </div>
          ) : !userReview || isEditMode ? (
            <ReviewForm
              platformId={platformId}
              onReviewSubmitted={handleReviewSubmitted}
              existingReview={userReview}
              isEditMode={isEditMode}
              onCancelEdit={handleCancelEdit}
            />
          ) : null}

          <ReviewList
            reviews={reviews}
            onReviewDeleted={handleReviewSubmitted}
            onEditReview={handleEditReview}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformDetails;
