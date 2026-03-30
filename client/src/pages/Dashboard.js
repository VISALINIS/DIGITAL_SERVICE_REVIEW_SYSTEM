import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddPlatformForm from "../components/AddPlatformForm";
import "../styles/Dashboard.css";

const Dashboard = ({ onPlatformDataUpdated }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="unauthorized">
          <h2>Please login to view your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.username}!</h1>
        <p>Manage your educational platform reviews</p>
      </div>

      {user.isAdmin && (
        <div className="admin-section">
          <AddPlatformForm onPlatformAdded={onPlatformDataUpdated} />
        </div>
      )}

      {!user.isAdmin && (
        <div className="user-section">
          <h2>My Platform Reviews</h2>
          <p>Visit the "Explore Learning Platforms" page to add and manage your reviews.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
