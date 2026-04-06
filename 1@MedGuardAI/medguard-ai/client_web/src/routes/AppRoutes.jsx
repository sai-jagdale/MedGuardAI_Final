import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Landing from "../pages/Landing";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import CheckMedicine from "../pages/CheckMedicine";
import History from "../pages/History";
import Layout from "../components/Layout";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Layout>{children}</Layout> : <Navigate to="/auth" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />

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
    </Routes>
  );
}