// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div 
          className="hero-background"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        
        <div className="hero-content">
          <div className="hero-badge animate-slide-down">
            <span className="badge-icon">⚕️</span>
            Trusted by 500+ Healthcare Providers
          </div>
          
          <h1 className="animate-slide-up">
            AI-Powered Medicine
            <span className="gradient-text"> Verification Platform</span>
          </h1>

          <p className="hero-description animate-slide-up delay-1">
            Detect counterfeit medicines, validate legality, check expiry 
            and receive AI-driven summaries in seconds. Join the fight 
            against fake pharmaceuticals.
          </p>

          <div className="hero-cta animate-slide-up delay-2">
            <button
              className="primary-btn large"
              onClick={() => navigate("/auth")}
            >
              Get Started Free
              <span className="btn-icon">→</span>
            </button>
            
            <button
              className="secondary-btn large"
              onClick={() => {
                document.getElementById("features").scrollIntoView({ 
                  behavior: "smooth" 
                });
              }}
            >
              Watch Demo
              <span className="btn-icon">▶</span>
            </button>
          </div>

          <div className="hero-stats animate-slide-up delay-3">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Medicines Verified</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">99.2%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">&lt;5s</span>
              <span className="stat-label">Response Time</span>
            </div>
          </div>
        </div>

        <div className="floating-elements">
          <div className="floating-circle one"></div>
          <div className="floating-circle two"></div>
          <div className="floating-circle three"></div>
          <div className="floating-circle four"></div>
        </div>

        <div className="scroll-indicator">
          <span className="mouse">
            <span className="wheel"></span>
          </span>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by">
        <div className="container">
          <p className="trusted-label">Trusted by leading healthcare companies</p>
          <div className="trusted-logos">
            <div className="logo-item">🏥 HealthCare Plus</div>
            <div className="logo-item">💊 PharmaCorp</div>
            <div className="logo-item">🏨 MediLife</div>
            <div className="logo-item">⚕️ GlobalHealth</div>
            <div className="logo-item">🔬 BioMed Solutions</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Choose Us</span>
            <h2>Powerful Features for <span className="gradient-text">Medicine Safety</span></h2>
            <p>Our AI-powered platform provides comprehensive medicine verification to ensure patient safety.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🧪</div>
              </div>
              <h3>Authenticity Detection</h3>
              <p>Advanced AI algorithms verify genuine medicines instantly by analyzing multiple data points.</p>
              <div className="feature-stats">
                <span className="stat">98% Accuracy</span>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📅</div>
              </div>
              <h3>Expiry Validation</h3>
              <p>Detect expired drugs before consumption with our real-time database of medicine batches.</p>
              <div className="feature-stats">
                <span className="stat">Real-time Check</span>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚖️</div>
              </div>
              <h3>Legal Compliance</h3>
              <p>Validate regulatory status across different countries and regions instantly.</p>
              <div className="feature-stats">
                <span className="stat">50+ Countries</span>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🤖</div>
              </div>
              <h3>AI Summary</h3>
              <p>Understand medicine purpose, side effects, and interactions through AI-generated summaries.</p>
              <div className="feature-stats">
                <span className="stat">Instant Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2>How <span className="gradient-text">MedGuard AI</span> Works</h2>
            <p>Three simple steps to verify any medicine</p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">📸</div>
              <h3>Upload or Enter</h3>
              <p>Take a photo of the medicine package or enter the medicine name manually</p>
            </div>

            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3>AI Analysis</h3>
              <p>Our AI analyzes the medicine against our comprehensive database</p>
            </div>

            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">✅</div>
              <h3>Get Results</h3>
              <p>Receive detailed verification report with authenticity, expiry, and legal status</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2>What <span className="gradient-text">Healthcare Professionals</span> Say</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote">"</div>
              <p className="testimonial-text">
                MedGuard AI has revolutionized how we verify medicines in our pharmacy. 
                The accuracy is remarkable and it's incredibly fast.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍⚕️</div>
                <div className="author-info">
                  <h4>Dr. Sarah Johnson</h4>
                  <p>Chief Pharmacist, City Hospital</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote">"</div>
              <p className="testimonial-text">
                Since implementing MedGuard AI, we've caught several counterfeit 
                medicines that would have otherwise reached patients.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍⚕️</div>
                <div className="author-info">
                  <h4>Dr. Michael Chen</h4>
                  <p>Medical Director, HealthFirst</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote">"</div>
              <p className="testimonial-text">
                The AI summaries are incredibly helpful for understanding new 
                medicines and their potential interactions.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍🔬</div>
                <div className="author-info">
                  <h4>Dr. Emily Rodriguez</h4>
                  <p>Research Scientist, PharmaLab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Ensure Medicine Safety?</h2>
            <p>Join thousands of healthcare providers who trust MedGuard AI for medicine verification.</p>
            <button
              className="primary-btn large"
              onClick={() => navigate("/auth")}
            >
              Start Verifying Now
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}