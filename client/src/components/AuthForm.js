import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/AuthForm.css";

const AuthForm = ({ mode, onSuccess }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const endpoint = mode === "login" ? "login" : "register";
      const body =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Authentication failed");
      }

      if (mode === "login") {
        if (!data.user || !data.token) {
          throw new Error("Invalid response from server");
        }
        login(data.user, data.token);
        onSuccess?.();
      } else {
        setFormData({ username: "", email: "", password: "" });
        alert("Registration successful! Please login.");
        onSuccess?.();
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
