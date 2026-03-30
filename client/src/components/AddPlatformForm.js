import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/AuthForm.css";

const CATEGORIES = [
  "Programming",
  "Competitive Exams",
  "School Learning",
  "College Resources",
  "Skill Development",
  "Language Learning",
];

const AddPlatformForm = ({ onPlatformAdded }) => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Programming",
    type: "Free",
    level: "Beginner",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/platforms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          website: formData.website || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create platform");
      }

      setSuccess("Platform added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "Programming",
        type: "Free",
        level: "Beginner",
        website: "",
      });
      onPlatformAdded?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user?.isAdmin) {
    return <div className="admin-only">Admin access required</div>;
  }

  return (
    <div className="form-container">
      <h2>Add New Educational Platform</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Platform Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
            <option value="Freemium">Freemium</option>
          </select>
        </div>

        <div className="form-group">
          <label>Level:</label>
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>Website URL (optional):</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Platform"}
        </button>
      </form>
    </div>
  );
};

export default AddPlatformForm;
