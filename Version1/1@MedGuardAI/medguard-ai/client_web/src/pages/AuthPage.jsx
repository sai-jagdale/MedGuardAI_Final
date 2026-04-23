// src/pages/AuthPage.jsx
import { useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate , useLocation } from "react-router-dom";
import "./AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",              
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // VALIDATION
    if (!form.email || !form.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    if (!isLogin && !form.name) {
      setError("Name is required for registration");
      setLoading(false);
      return;
    }

    if (!isLogin && form.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const data = await loginUser({
          email: form.email,          // ✅ FIXED
          password: form.password,
        });

        login(data.access, data.refresh);
        navigate("/dashboard");

      } else {
        // REGISTER
        const res = await registerUser({
          name: form.name,            // ✅ FIXED
          email: form.email,
          password: form.password,
        });

       setToast(res.message);   // show toast
       setIsLogin(true);        // go to login
       setForm({ name: "", email: "", password: "" });
      
       setToast(res.message);
       // auto hide toast
       setTimeout(() => {
        setToast("");
      }, 3000);

      }
    } catch (error) {
      console.error("Auth error:", error);

      // ✅ SIMPLIFIED ERROR HANDLING
      if (error.response) {
        setError(
          error.response.data?.message ||
          JSON.stringify(error.response.data)
        );
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

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogin(true);
    } else if (location.pathname === "/register") {
      setIsLogin(false);
    }
  }, [location]);

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
            
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={error && !form.name ? "error" : ""}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
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

            <div className="form-group">
              <label>Password</label>
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
              setForm({ name: "", email: "", password: "" }); // ✅ FIXED
            }}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}