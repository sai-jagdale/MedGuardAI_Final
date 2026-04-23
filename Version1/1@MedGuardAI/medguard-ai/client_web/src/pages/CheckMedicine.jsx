import { useState } from "react";
import "./CheckMedicine.css";
import { verifyMedicine } from "../services/medicineService";

export default function CheckMedicine() {
  const [activeTab, setActiveTab] = useState("text"); // 'text', 'image', 'barcode'
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!input.trim() && activeTab === 'text') return;

    setLoading(true);
    setResult(null);

    // Mock delay for UI feeling
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // In a real app we would pass different data based on the tab
      // For now we use the existing verifyMedicine which takes a text string
      const res = await verifyMedicine({
        text: input || "Sample Medicine Input",
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
      case "Authentic": return "#16A34A";
      case "Fake": return "#DC2626";
      case "Expired": return "#F59E0B";
      case "Illegal": return "#7C3AED";
      default: return "#2563EB";
    }
  };

  return (
    <div className="check-medicine-page">
      <h1 className="page-title">Verify Medicine</h1>
      <p className="page-subtitle">Choose your preferred input method to verify medicine authenticity</p>

      {/* Tabs */}
      <div className="methods-tabs">
        <div
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => { setActiveTab('text'); setResult(null); }}
        >
          <span className="tab-icon">T</span>
          <span className="tab-label">Text Input</span>
        </div>
        <div
          className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => { setActiveTab('image'); setResult(null); }}
        >
          <span className="tab-icon">📷</span>
          <span className="tab-label">Image Upload</span>
        </div>
        <div
          className={`tab-btn ${activeTab === 'barcode' ? 'active' : ''}`}
          onClick={() => { setActiveTab('barcode'); setResult(null); }}
        >
          <span className="tab-icon">||||</span>
          <span className="tab-label">Barcode Scan</span>
        </div>
      </div>

      {/* Tab Content - Text Input */}
      {activeTab === 'text' && (
        <div className="tab-content">
          <h3 className="content-title">Enter Medicine Details</h3>
          <div className="grid-form">
            <div className="form-group">
              <label>Medicine Name <span>*</span></label>
              <input
                placeholder="e.g., Paracetamol 500mg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Manufacturer</label>
              <input placeholder="e.g., PharmaCorp Ltd." />
            </div>
            <div className="form-group">
              <label>Batch Number</label>
              <input placeholder="e.g., BATCH-2024-001" />
            </div>
            <div className="form-group">
              <label>Barcode</label>
              <input placeholder="e.g., 8901234567890" />
            </div>
            <div className="form-group">
              <label>Manufacturing Date</label>
              <input placeholder="dd-mm-yyyy" />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input placeholder="dd-mm-yyyy" />
            </div>
          </div>
          <div className="form-actions">
            <button
              className="btn-primary large"
              onClick={handleVerify}
              disabled={loading || !input.trim()}
            >
              {loading ? "Analyzing..." : "Verify Medicine"}
            </button>
          </div>
        </div>
      )}

      {/* Tab Content - Image Upload */}
      {activeTab === 'image' && (
        <div className="tab-content">
          <h3 className="content-title">Upload Medicine Image</h3>

          <div className="upload-area">
            <div className="upload-icon">📷</div>
            <div className="upload-text">Click to upload medicine package image</div>
            <div className="upload-subtext">Supports JPG, PNG (Max 10MB)</div>
          </div>

          <div className="ai-pipeline-box">
            <div className="pipeline-title">AI Processing Pipeline</div>
            <ul className="pipeline-list">
              <li>OCR Agent extracts text from image</li>
              <li>Barcode Agent detects and decodes barcode</li>
              <li>Extraction Agent identifies MFG/EXP/MRP dates</li>
              <li>Search Agent matches against database</li>
              <li>Summary Agent provides final verification</li>
            </ul>
          </div>

          <button
            className={`btn-secondary large ${!loading ? 'active' : ''}`}
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Analyzing Image..." : "↑ Analyze Image"}
          </button>
        </div>
      )}

      {/* Tab Content - Barcode Scan */}
      {activeTab === 'barcode' && (
        <div className="tab-content">
          <div className="barcode-visual">
            <div className="laser-line"></div>
            <div className="barcode-stripes">
              <div style={{ width: '8px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '4px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '16px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '4px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '10px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '4px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '14px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '8px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '18px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '6px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
              <div style={{ width: '12px', height: '100%', background: '#0f172a', borderRadius: '4px' }}></div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Or Enter Barcode Manually</label>
            <input
              placeholder="8901234567890"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="sample-barcodes">
            <div className="sample-title">Try sample barcodes:</div>
            <div className="sample-list">
              <div className="sample-item" onClick={() => setInput("8901234567890")}>
                <div className="sample-code">8901234567890</div>
                <div className="sample-desc">Paracetamol 500mg</div>
              </div>
              <div className="sample-item" onClick={() => setInput("8901234567891")}>
                <div className="sample-code">8901234567891</div>
                <div className="sample-desc">Ibuprofen 400mg</div>
              </div>
              <div className="sample-item" onClick={() => setInput("8901234567892")}>
                <div className="sample-code">8901234567892</div>
                <div className="sample-desc">Amoxicillin 250mg</div>
              </div>
            </div>
          </div>

          <button
            className={`btn-secondary large ${input ? 'active' : ''}`}
            onClick={handleVerify}
            disabled={loading || !input}
          >
            {loading ? "Checking Database..." : "🔍 Verify Barcode"}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loader-container fade-in">
          <div className="loader"></div>
          <div className="loader-text">Analyzing securely with MedGuard AI...</div>
        </div>
      )}

      {/* Result Card */}
      {result && !loading && (
        <div
          className="result-card premium fade-in"
          style={{ '--status-color': getStatusColor(result.status) }}
        >
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
            <div className="detail-item">
              <span className="detail-label">Expiry Status</span>
              <span className="detail-value">{result.expiry_status}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Legal Status</span>
              <span className="detail-value">{result.legality_status}</span>
            </div>
          </div>

          <div className="summary-box">
            <h4>AI Medical Summary</h4>
            <p>{result.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}