import { useState, useContext } from "react";
import { loginUser, registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser({
        username: form.email,
        password: form.password,
      });

      login(res.data.access);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>MedGuard AI</h1>
        <p>
          AI-powered medicine verification platform ensuring
          authenticity, safety and compliance.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card-premium">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <input
            type="text"
            placeholder="Email / Username"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button onClick={handleSubmit} className="primary-btn large">
            Login
          </button>

          <div className="auth-footer-text">
            Secured with JWT Authentication
          </div>
        </div>
      </div>
    </div>
  );
}