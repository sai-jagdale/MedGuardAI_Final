// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    if (token) {
      try {
        // Decode token to get user info
        const decoded = jwtDecode(token);

        // Fetch extended profile
        API.get("/api/auth/profile/")
          .then(res => {
            setUser({
              username: decoded.username || decoded.user_id,
              userId: decoded.user_id,
              profile: res.data.data
            });
            setLoading(false);
          })
          .catch(err => {
            console.error("Failed fetching profile:", err);
            // Fallback to basic decoded user if profile fails
            setUser({
              username: decoded.username || decoded.user_id,
              userId: decoded.user_id,
            });
            setLoading(false);
          });
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(accessToken);

    try {
      const decoded = jwtDecode(accessToken);
      // Let the useEffect trigger the profile fetch by updating `token` state
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const updateProfileContext = (newProfile) => {
    setUser(prev => ({
      ...prev,
      profile: newProfile
    }));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateProfileContext }}>
      {children}
    </AuthContext.Provider>
  );
};