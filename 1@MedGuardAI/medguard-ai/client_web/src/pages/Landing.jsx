import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-content fade-in">
          <h1>
            AI-Powered Medicine <span>Verification Platform</span>
          </h1>

          <p>
            Detect counterfeit medicines, validate legality,
            check expiry and receive AI-driven summaries in seconds.
          </p>

          <button
            className="primary-btn large"
            onClick={() => navigate("/")}
          >
            Get Started
          </button>
        </div>

        <div className="floating-circle one"></div>
        <div className="floating-circle two"></div>
        <div className="floating-circle three"></div>
      </section>

      <section className="stats-section fade-in">
        <div className="stat">
          <h2>10K+</h2>
          <p>Medicines Verified</p>
        </div>
        <div className="stat">
          <h2>99.2%</h2>
          <p>Detection Accuracy</p>
        </div>
        <div className="stat">
          <h2>&lt;5s</h2>
          <p>Search Response</p>
        </div>
      </section>

      <section className="features fade-in">
        <h2>Why MedGuard AI?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            🧪 <h3>Authenticity Detection</h3>
            <p>Advanced AI verifies genuine medicines instantly.</p>
          </div>

          <div className="feature-card">
            📅 <h3>Expiry Validation</h3>
            <p>Detect expired drugs before consumption.</p>
          </div>

          <div className="feature-card">
            ⚖️ <h3>Legal Compliance</h3>
            <p>Validate regulatory status in seconds.</p>
          </div>

          <div className="feature-card">
            🤖 <h3>AI Summary</h3>
            <p>Understand medicine purpose clearly & safely.</p>
          </div>
        </div>
      </section>
    </>
  );
}