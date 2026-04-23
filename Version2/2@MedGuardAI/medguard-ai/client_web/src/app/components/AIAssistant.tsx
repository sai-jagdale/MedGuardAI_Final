import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Stethoscope,
  Send,
  Sparkles,
  AlertCircle,
  Info,
  Home,
  ArrowLeft,
  ShieldCheck,
  Leaf,
  Coffee,
  Apple,
  Droplets,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useAuth } from "../../contexts/AuthContext";
import { Footer } from "./Footer";

export function AIAssistant() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const [chat, setChat] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const { accessToken } = useAuth(); // IMPORTANT (for token)

  useEffect(() => {
    if (accessToken) {
     loadSessions();
    }
  }, [accessToken]);


  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    const userMessage = symptoms;

    setChat((prev) => [
      ...prev,
      { user: userMessage, ai: null },
    ]);

    setSymptoms("");
    setIsAnalyzing(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ai/symptoms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: currentSessionId || null,
        }),
      });

      const data = await res.json();

      setCurrentSessionId(data.session_id);

      setChat((prev) => [
        ...prev,
        {
          user: null,
          ai: data.data, // 🔥 now string
        },
      ]);

    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSessions = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/history/sessions/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/history/messages/${sessionId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      setChat(data);
      setCurrentSessionId(sessionId);
    } catch (err) {
      console.error(err);
    }
  };

  const formatAIResponse = (text: string) => {
    if (!text) return null;
    // Split paragraphs
    const parts = text.split("\n");
    return parts.map((part, index) => {
      const lower = part.toLowerCase();
      // 🎯 HEADINGS
      if (lower.includes("rest") || lower.includes("hydrate") || lower.includes("remedy")) {
        return (
          <p key={index} className="font-semibold text-green-600">
            💊 {part}
          </p>
        );
      }
      if (lower.includes("avoid") || lower.includes("monitor") || lower.includes("precaution")) {
        return (
          <p key={index} className="font-semibold text-orange-500">
            ⚠️ {part}
          </p>
        );
      }
      if (lower.includes("doctor") || lower.includes("mbbs")) {
        return (
          <p key={index} className="font-semibold text-red-500">
            👨‍⚕️ {part}
          </p>
        );
      }
      // Normal text
      return (
        <p key={index} className="text-gray-700">
          😊 {part}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-[#4A90E2] px-5 py-2.5 rounded-full text-sm font-medium mb-4">
            <Stethoscope className="w-4 h-4" />
            <span>AI-Powered Health Assistant</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Symptom-Based Home Remedies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms and get AI-powered home remedy suggestions and precautions
          </p>
        </div>
          <div className="max-w-4xl mx-auto px-4 pb-20">

            {/* ⚠️ IMPORTANT WARNING */}
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6">
              <p className="font-medium">⚠ Important</p>
              <p className="text-sm">
                This is an AI assistant providing general wellness suggestions. It is NOT a substitute for professional medical advice.
              </p>
            </div>

            {/* CHAT BOX */}
            <div className="bg-white rounded-2xl shadow-lg flex flex-col h-[500px]">

              {/* CHAT MESSAGES */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {chat.map((msg, i) => (
                  <div key={i} className="space-y-2">

                    {/* USER */}
                    {msg.user && (
                      <div className="flex justify-end">
                        <div className="bg-[#4A90E2] text-white px-4 py-2 rounded-xl max-w-xs">
                          {msg.user}
                        </div>
                      </div>
                    )}

                    {/* AI */}
                    {msg.ai && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-xl max-w-md text-gray-700 space-y-2">

                    {formatAIResponse(msg.ai)}

                  </div>
                </div>
              )}

                  </div>
                ))}

                {/* LOADING */}
                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-xl animate-pulse text-gray-600">
                      AI is typing...
                    </div>
                  </div>
                )}

              </div>

              {/* INPUT BOX */}
              <div className="border-t p-4 flex gap-3">
                <input
                  type="text"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your symptoms..."
                  className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />

                <button
                  onClick={handleAnalyze}
                  className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white px-6 py-2 rounded-xl"
                >
                  Send
                </button>
              </div>

            </div>
          </div>
        
      </div>
      {/* Footer Section */}
    <Footer />
    </div>
  );
}

