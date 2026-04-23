import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot({ open, setOpen }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am MedGuard AI. How can I assist you with your health or medicines today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  if (!open) return null;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Connect to the new Django /api/chat/ endpoint
      const res = await fetch("http://localhost:5000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "No response received." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to MedGuard AI server." },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-avatar">✨</div>
          <div>
            <h3 className="chatbot-title">MedGuard AI</h3>
            <p className="chatbot-status">
              <span className="status-dot"></span> Online
            </p>
          </div>
        </div>
        <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
      </div>

      <div className="chatbot-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble-wrapper ${msg.sender}`}>
            <div className={`chat-bubble`}>
              {msg.text}
            </div>
            <div className="chat-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble-wrapper bot">
            <div className="chat-bubble">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Type your health query..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
        />
        <button
          className="chatbot-send-btn"
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
        >
          ➤
        </button>
      </div>
    </div>
  );
}