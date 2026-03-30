import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminStats from "./AdminStats";
import AdminAnalytics from "./AdminAnalytics";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      setError("Access denied. Admin only.");
      setLoading(false);
      return;
    }
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalytics(data.data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You must be an admin to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>{error}</p>
        <button onClick={fetchAnalytics}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Educational Platform Review System Analytics</p>
      </div>

      {analytics && (
        <>
          <AdminStats totalCounts={analytics.totalCounts} />
          <AdminAnalytics analytics={analytics} />
        </>
      )}
    </div>
  );
}
