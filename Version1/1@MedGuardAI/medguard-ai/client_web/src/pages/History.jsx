import { useEffect, useState } from "react";
import API from "../services/api";
import "./History.css";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/history/").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="history-page">
      <h2>Verification History</h2>
      <div className="history-grid">
        {history.map((item) => (
          <div key={item.id} className="history-card">
            <p className="history-input">{item.raw_input}</p>
            <strong data-status={item.result_status}>{item.result_status}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}