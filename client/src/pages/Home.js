import React, { useState, useEffect } from "react";
import PlatformCard from "../components/PlatformCard";
import "../styles/Home.css";

const CATEGORIES = [
  "All",
  "Programming",
  "Competitive Exams",
  "School Learning",
  "College Resources",
  "Skill Development",
  "Language Learning",
];

const Home = ({ onPlatformClick }) => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPlatforms();
  }, []);

  const loadPlatforms = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/platforms");
      if (!response.ok) throw new Error("Failed to load platforms");
      const data = await response.json();
      setPlatforms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlatforms =
    selectedCategory === "All"
      ? platforms
      : platforms.filter((p) => p.category === selectedCategory);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Explore Learning Platforms</h1>
        <p>Discover and review educational platforms for your learning journey</p>
      </header>

      <div className="filter-section">
        <h3>Filter by Category:</h3>
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading platforms...</div>
      ) : filteredPlatforms.length === 0 ? (
        <div className="no-platforms">
          No platforms found in this category. Check back soon!
        </div>
      ) : (
        <div className="platforms-grid">
          {filteredPlatforms.map((platform) => (
            <div
              key={platform._id}
              onClick={() => onPlatformClick(platform._id)}
              style={{ cursor: "pointer" }}
            >
              <PlatformCard platform={platform} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
