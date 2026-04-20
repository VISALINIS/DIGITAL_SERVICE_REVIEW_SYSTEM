import React, { useState, useEffect } from "react";
import PlatformCard from "../components/PlatformCard";
import TopRatedServices from "../components/TopRatedServices";
import CategorySections from "../components/CategorySections";
import "../styles/Home.css";

const CATEGORIES = [
  "All",
  "Programming",
  "Competitive Exams",
  "School Learning",
  "College Resources",
  "Skill Development",
  "Language Learning",
  "Entertainment",
  "Finance",
  "E-commerce",
  "Social Media",
  "Productivity",
  "Health & Fitness",
  "Travel",
];

const Home = ({ onPlatformClick }) => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredPlatforms = platforms.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Explore Digital Services</h1>
        <p>Discover and review top-rated services across all domains</p>
      </header>

      {!loading && platforms.length > 0 && (
        <>
          <TopRatedServices platforms={platforms} onServiceClick={onPlatformClick} />
          <CategorySections
            platforms={platforms}
            categories={CATEGORIES}
            onServiceClick={onPlatformClick}
          />
        </>
      )}

      <div className="search-filter-wrapper">
        <div className="search-bar-section">
          <input
            type="text"
            placeholder="🔍 Search by name or description..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading services...</div>
      ) : filteredPlatforms.length === 0 ? (
        <div className="no-platforms">
          <div className="no-results-icon">🔍</div>
          <h3>No services found</h3>
          <p>Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="search-results-section">
          <h2 className="results-title">Search Results</h2>
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
        </div>
      )}
    </div>
  );
};

export default Home;
