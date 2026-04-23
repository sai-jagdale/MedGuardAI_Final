// src/components/Topbar.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="page-title">
          Welcome back, {user?.username || "User"}!
        </div>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn">
          <span className="icon">🔔</span>
          <span className="badge">3</span>
        </button>

        <button className="topbar-icon-btn">
          <span className="icon">✉️</span>
          <span className="badge">2</span>
        </button>

        <div className="user-profile">
          <div 
            className="profile-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="profile-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="profile-name">{user?.username}</span>
            <span className="dropdown-arrow">▼</span>
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <a href="/profile" className="dropdown-item">
                <span className="icon">👤</span> Profile
              </a>
              <a href="/settings" className="dropdown-item">
                <span className="icon">⚙️</span> Settings
              </a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout">
                <span className="icon">🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}