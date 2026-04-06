// src/components/Layout.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="layout-loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <main className="content-area">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}