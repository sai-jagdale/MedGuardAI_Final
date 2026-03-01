import { useState } from "react";
import { verifyMedicine } from "../services/medicineService";

export default function CheckMedicine() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await verifyMedicine({
        text: input,
      });

      setResult(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Verification failed");
    }

    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Authentic":
        return "#16A34A";
      case "Fake":
        return "#DC2626";
      case "Expired":
        return "#F59E0B";
      case "Illegal":
        return "#7C3AED";
      default:
        return "#2563EB";
    }
  };

  return (
    <div>
      <h2>Medicine Verification</h2>

      <div className="verify-box">
        <input
          placeholder="Enter medicine name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleVerify}>
          {loading ? "Analyzing..." : "Verify"}
        </button>
      </div>

      {loading && <div className="loader"></div>}

      {result && (
        <div className="result-card premium fade-in">
          <div className="result-header">
            <h3
              className="status-badge"
              style={{ background: getStatusColor(result.status) }}
            >
              {result.status}
            </h3>

            <div className="confidence-section">
              <span>Confidence Score</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${result.similarity_score * 100}%`,
                    background: getStatusColor(result.status),
                  }}
                ></div>
              </div>
              <small>{(result.similarity_score * 100).toFixed(1)}%</small>
            </div>
          </div>

          <div className="result-details">
            <p><strong>Expiry:</strong> {result.expiry_status}</p>
            <p><strong>Legality:</strong> {result.legality_status}</p>
          </div>

          <div className="summary-box">
            <h4>AI Summary</h4>
            <p>{result.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}