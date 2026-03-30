const API_BASE_URL = "http://localhost:5000/api";

export const apiService = {
  // Auth
  register: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Platforms
  getPlatforms: async (category = null) => {
    const url = category
      ? `${API_BASE_URL}/platforms?category=${category}`
      : `${API_BASE_URL}/platforms`;
    const response = await fetch(url);
    return response.json();
  },

  getPlatformById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/platforms/${id}`);
    return response.json();
  },

  createPlatform: async (platformData, token) => {
    const response = await fetch(`${API_BASE_URL}/platforms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(platformData),
    });
    return response.json();
  },

  updatePlatform: async (id, platformData, token) => {
    const response = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(platformData),
    });
    return response.json();
  },

  deletePlatform: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Reviews
  addReview: async (platformId, rating, comment, token) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${platformId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
    });
    return response.json();
  },

  getReviews: async (platformId) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${platformId}`);
    return response.json();
  },

  deleteReview: async (reviewId, token) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
