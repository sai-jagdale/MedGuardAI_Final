// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">🩺</span>
          <span className="logo-text">MedGuard AI</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {!user ? (
            // Public Navigation
            <>
              <Link 
                to="/" 
                className={isActive("/") ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/auth" 
                className={`auth-link ${isActive("/auth") ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
            </>
          ) : (
            // Authenticated Navigation
            <>
              <Link 
                to="/dashboard" 
                className={isActive("/dashboard") ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
              <Link 
                to="/check" 
                className={isActive("/check") ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">🔍</span>
                Verify Medicine
              </Link>
              <Link 
                to="/history" 
                className={isActive("/history") ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">📜</span>
                History
              </Link>
            </>
          )}

          {/* User Menu */}
          {user && (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-avatar">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user.username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}