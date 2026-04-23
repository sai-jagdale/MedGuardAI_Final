// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section brand">
            <div className="footer-logo">
              <span className="logo-icon">🩺</span>
              <span className="logo-text">MedGuard AI</span>
            </div>
            <p className="footer-description">
              AI-powered medicine verification platform ensuring authenticity, 
              safety and compliance for a healthier tomorrow.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="social-link" aria-label="GitHub">⌨️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/auth">Login</Link></li>
              <li><Link to="/auth">Register</Link></li>
              <li><Link to="/check">Verify Medicine</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Authenticity Detection</li>
              <li>Expiry Validation</li>
              <li>Legal Compliance</li>
              <li>AI Summaries</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="contact-info">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:support@medguard.ai">support@medguard.ai</a>
              </li>
              <li>
                <span className="contact-icon">📱</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} MedGuard AI. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}