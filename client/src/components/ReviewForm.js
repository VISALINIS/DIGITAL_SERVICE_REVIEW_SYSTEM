import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/ReviewForm.css";

const ReviewForm = ({
  platformId,
  onReviewSubmitted,
  existingReview,
  isEditMode,
  onCancelEdit,
}) => {
  const { user, token } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (existingReview && isEditMode) {
      setRating(existingReview.rating);
      setComment(existingReview.comment || "");
    } else if (!isEditMode) {
      setRating(5);
      setComment("");
    }
  }, [existingReview, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login to submit a review");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEditMode && existingReview) {
        // Update existing review
        const response = await fetch(
          `http://localhost:5000/api/reviews/${existingReview._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              rating: parseInt(rating),
              comment,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to update review");
        }

        setSuccess("Review updated successfully!");
        setTimeout(() => {
          onReviewSubmitted?.();
        }, 1000);
      } else {
        // Create new review
        const response = await fetch(`http://localhost:5000/api/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            platformId,
            rating: parseInt(rating),
            comment,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to submit review");
        }

        setSuccess("Review submitted successfully!");
        setComment("");
        setRating(5);
        setTimeout(() => {
          onReviewSubmitted?.();
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3>{isEditMode ? "Edit Your Review" : "Add Your Review"}</h3>
      {!user && (
        <p className="login-prompt">Please login to submit a review</p>
      )}
      <form onSubmit={handleSubmit} disabled={!user}>
        <div className="form-group">
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            disabled={!user}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)"
            disabled={!user}
            rows="4"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-actions">
          <button type="submit" disabled={!user || loading} className="submit-btn">
            {loading
              ? "Submitting..."
              : isEditMode
              ? "Update Review"
              : "Submit Review"}
          </button>
          {isEditMode && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
