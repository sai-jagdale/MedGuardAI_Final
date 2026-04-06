// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

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
          aria-label="Toggle menu"
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
                Dashboard
              </Link>
              <Link 
                to="/check" 
                className={isActive("/check") ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                Verify Medicine
              </Link>
              <Link 
                to="/history" 
                className={isActive("/history") ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                History
              </Link>
              
              {/* User Menu */}
              <div className="user-menu">
                <span className="user-name">{user?.username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}