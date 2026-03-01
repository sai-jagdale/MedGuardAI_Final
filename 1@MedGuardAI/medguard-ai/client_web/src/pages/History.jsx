import { useEffect, useState } from "react";
import API from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/history/").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="history">
      <h2>Verification History</h2>
      {history.map((item) => (
        <div key={item.id} className="history-card">
          <p>{item.raw_input}</p>
          <strong>{item.result_status}</strong>
        </div>
      ))}
    </div>
  );
}