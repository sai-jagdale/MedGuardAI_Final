import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        🩺 MedGuard AI
      </div>

      <div className="nav-links">
        {!user && <Link to="/">Home</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/check">Verify</Link>}
        {user && <Link to="/history">History</Link>}
        {user ? (
          <button className="primary-btn" onClick={() => { logout(); navigate("/"); }}>
            Logout
          </button>
        ) : (
          <Link to="/" className="primary-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}