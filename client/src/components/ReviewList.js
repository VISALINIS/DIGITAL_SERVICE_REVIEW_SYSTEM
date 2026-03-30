import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/ReviewList.css";

const ReviewList = ({
  reviews,
  onReviewDeleted,
  onEditReview,
  isLoading,
}) => {
  const { user, token } = useContext(AuthContext);

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        onReviewDeleted?.();
      }
    } catch (err) {
      console.error("Failed to delete review", err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="review-list">
      <h3>Reviews ({reviews.length})</h3>
      {reviews.map((review) => {
        const isUserReview = user?._id === review.userId?._id;
        return (
          <div key={review._id} className="review-item">
            <div className="review-header">
              <span className="reviewer-name">
                {review.userId?.username || "Anonymous"}
                {isUserReview && <span className="your-review-badge">(Your Review)</span>}
              </span>
              <span className="review-rating">
                {"⭐".repeat(review.rating)}
              </span>
            </div>

            {review.comment && (
              <p className="review-comment">{review.comment}</p>
            )}

            <div className="review-footer">
              <span className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>

              {isUserReview && (
                <div className="review-actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEditReview?.(review)}
                    title="Edit review"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteReview(review._id)}
                    title="Delete review"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
