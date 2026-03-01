import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* ===== STATS ROW ===== */}
      <div className="stats-horizontal">

        <div className="stat-card-pro">
          <div className="stat-title">Total Verified</div>
          <div className="stat-value">1,240</div>
        </div>

        <div className="stat-card-pro">
          <div className="stat-title">Accuracy</div>
          <div className="stat-value highlight-blue">98.7%</div>
        </div>

        <div className="stat-card-pro">
          <div className="stat-title">Expired Detected</div>
          <div className="stat-value highlight-orange">35</div>
        </div>

        <div className="stat-card-pro">
          <div className="stat-title">Illegal Medicines</div>
          <div className="stat-value highlight-red">12</div>
        </div>

      </div>

      {/* ===== ACTION SECTION ===== */}
      <div className="action-section">

        <div
          className="action-card"
          onClick={() => navigate("/check")}
        >
          <div className="action-icon">🧪</div>
          <h3>Verify Medicine</h3>
          <p>Analyze authenticity, expiry and compliance instantly.</p>
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/history")}
        >
          <div className="action-icon">📜</div>
          <h3>Verification History</h3>
          <p>View detailed logs of previous verifications.</p>
        </div>

      </div>

    </div>
  );
}