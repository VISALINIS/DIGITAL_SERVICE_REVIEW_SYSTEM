import React from "react";
import "../styles/CategorySections.css";

const CategorySections = ({ platforms, categories, onServiceClick }) => {
  const getCategoryServices = (category) => {
    return platforms
      .filter((p) => p.category === category)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 6);
  };

  const categoriesWithServices = categories
    .filter((cat) => cat !== "All" && getCategoryServices(cat).length > 0)
    .slice(0, 6);

  if (categoriesWithServices.length === 0) {
    return null;
  }

  return (
    <section className="category-sections">
      {categoriesWithServices.map((category) => {
        const services = getCategoryServices(category);
        if (services.length === 0) return null;

        return (
          <div key={category} className="category-section">
            <div className="category-header">
              <h3>{category}</h3>
              <span className="service-count">{services.length}+ services</span>
            </div>

            <div className="horizontal-scroll">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="category-card"
                  onClick={() => onServiceClick(service._id)}
                >
                  <div className="category-card-header">
                    <span className={`type-badge type-${service.type.toLowerCase()}`}>
                      {service.type}
                    </span>
                  </div>

                  <div className="category-card-body">
                    <h4>{service.name}</h4>
                    <p className="card-description">{service.description}</p>
                  </div>

                  <div className="category-card-footer">
                    <div className="rating-compact">
                      <span className="stars">
                        {"⭐".repeat(Math.floor(service.averageRating))}
                      </span>
                      <span className="rating-num">{service.averageRating.toFixed(1)}</span>
                    </div>
                    <span className="click-hint">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CategorySections;
