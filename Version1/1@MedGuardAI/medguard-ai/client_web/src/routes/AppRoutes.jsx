import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import CheckMedicine from "../pages/CheckMedicine";
import History from "../pages/History";
import Layout from "../components/Layout";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import SetupProfile from "../pages/SetupProfile";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null; // Wait for context
  console.log("User in PrivateRoute:", user);
  if (!user) return <Navigate to="/login" replace />;

  // Trap user in setup if it's their first login
  if (user.profile?.is_first_login && location.pathname !== '/setup-profile') {
    return <Navigate to="/setup-profile" replace />;
  }

  // Prevent returning to setup if already completed
  if (!user.profile?.is_first_login && location.pathname === '/setup-profile') {
    return <Navigate to="/dashboard" replace />;
  }

  // Setup profile uses independent layout design
  if (location.pathname === '/setup-profile') {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/check"
        element={
          <PrivateRoute>
            <CheckMedicine />
          </PrivateRoute>
        }
      />

      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />

      {/* New Phase 2 Routes */}
      <Route
        path="/setup-profile"
        element={
          <PrivateRoute>
            <SetupProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}