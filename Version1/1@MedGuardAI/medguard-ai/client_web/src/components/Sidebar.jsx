// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Chatbot from "./Chatbot"; // 👈 NEW
import "./Sidebar.css";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // 👈 NEW

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/check", icon: "🔍", label: "Verify Medicine" },
    { path: "/history", icon: "📜", label: "History" },
    { path: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate("/")}>
            <span className="logo-icon">🩺</span>
            {!collapsed && <span className="logo-text">MedGuard AI</span>}
          </div>

          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* User */}
        <div
          className="sidebar-user"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          title="View Profile"
        >
          <div className="user-avatar-large">
            {user?.profile?.avatar ? (
              <img
                src={user.profile.avatar.startsWith('/media/') ? `http://localhost:5000${user.profile.avatar}` : user.profile.avatar}
                alt="Avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              user?.username?.charAt(0).toUpperCase()
            )}
          </div>

          {!collapsed && (
            <div className="user-info">
              <div className="user-name">{user?.username}</div>
              <div className="user-role" style={{ color: 'var(--mg-primary)', fontWeight: '600', fontSize: '0.85rem' }}>View Profile →</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && (
                <span className="nav-label">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">

          {/* 🤖 Chatbot Button */}
          <button
            className="sidebar-chatbot"
            onClick={() => setChatOpen(true)}
          >
            <span className="nav-icon">🤖</span>
            {!collapsed && <span className="nav-label">AI Assistant</span>}
          </button>

          {/* Logout */}
          <button className="sidebar-logout" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {!collapsed && <span className="nav-label">Logout</span>}
          </button>

        </div>
      </div>

      {/* 🤖 Chatbot Component */}
      <Chatbot open={chatOpen} setOpen={setChatOpen} />
    </>
  );
}