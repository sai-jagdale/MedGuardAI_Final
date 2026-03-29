// src/pages/AuthPage.jsx
import { useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css"; // Changed from "../AuthPage.css" to "./AuthPage.css"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!form.username || !form.password) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    if (!isLogin && !form.email) {
      setError("Email is required for registration");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        console.log("Attempting login with:", form.username);
        const res = await loginUser({
          username: form.username,
          password: form.password,
        });
        
        console.log("Login response:", res.data);
        
        // TokenObtainPairView returns {access, refresh}
        if (res.data.access && res.data.refresh) {
          login(res.data.access, res.data.refresh);
          navigate("/dashboard");
        } else {
          setError("Invalid response from server");
        }
      } else {
        // REGISTER
        console.log("Attempting registration with:", form.username);
        const res = await registerUser({
          username: form.username,
          email: form.email,
          password: form.password,
        });
        
        console.log("Registration response:", res.data);
        
        alert("Registration successful! Please login.");
        setIsLogin(true);
        setForm({ username: "", email: "", password: "" }); // Clear form
      }
    } catch (error) {
      console.error("Auth error:", error);
      
      // Handle different error formats
      if (error.response) {
        if (error.response.data.detail) {
          setError(error.response.data.detail);
        } else if (error.response.data.non_field_errors) {
          setError(error.response.data.non_field_errors[0]);
        } else if (error.response.data.username) {
          setError(`Username: ${error.response.data.username[0]}`);
        } else if (error.response.data.password) {
          setError(`Password: ${error.response.data.password[0]}`);
        } else if (error.response.data.email) {
          setError(`Email: ${error.response.data.email[0]}`);
        } else {
          setError(JSON.stringify(error.response.data));
        }
      } else if (error.request) {
        setError("No response from server. Please check if backend is running.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>MedGuard AI</h1>
        <p>
          AI-powered medicine verification platform ensuring
          authenticity, safety and compliance.
        </p>
        <div className="auth-features">
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Real-time medicine verification</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Expiry date validation</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Legal compliance check</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>AI-powered summaries</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card-premium">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? "Login to access your dashboard" 
              : "Register to start verifying medicines"}
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleInputChange}
                disabled={loading}
                className={error && !form.username ? "error" : ""}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={error && !form.email ? "error" : ""}
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
                disabled={loading}
                className={error && !form.password ? "error" : ""}
              />
            </div>

            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                isLogin ? "Login" : "Register"
              )}
            </button>
          </form>

          <p 
            className="toggle-auth"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setForm({ username: "", email: "", password: "" });
            }}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}