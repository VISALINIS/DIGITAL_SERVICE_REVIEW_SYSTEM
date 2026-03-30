import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PlatformDetails from "./pages/PlatformDetails";
import AuthForm from "./components/AuthForm";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setSelectedPlatformId(null);
    window.scrollTo(0, 0);
  };

  const handlePlatformClick = (platformId) => {
    setSelectedPlatformId(platformId);
    setCurrentPage("platform-details");
    window.scrollTo(0, 0);
  };

  const handleBackFromDetails = () => {
    setCurrentPage("home");
    setSelectedPlatformId(null);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navbar onNavClick={handleNavClick} />
        <main className="main-content">
          {currentPage === "home" && (
            <Home onPlatformClick={handlePlatformClick} />
          )}
          {currentPage === "platform-details" && (
            <PlatformDetails
              platformId={selectedPlatformId}
              onBack={handleBackFromDetails}
            />
          )}
          {currentPage === "dashboard" && (
            <Dashboard onPlatformDataUpdated={() => handleNavClick("home")} />
          )}
          {currentPage === "login" && (
            <AuthForm
              mode="login"
              onSuccess={() => handleNavClick("home")}
            />
          )}
          {currentPage === "register" && (
            <AuthForm
              mode="register"
              onSuccess={() => handleNavClick("login")}
            />
          )}
          {currentPage === "add-platform" && (
            <Dashboard onPlatformDataUpdated={() => handleNavClick("home")} />
          )}
          {currentPage === "admin-dashboard" && (
            <AdminDashboard />
          )}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
