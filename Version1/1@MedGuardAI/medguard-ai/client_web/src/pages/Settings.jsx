import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Settings.css";

export default function Settings() {
    const { user } = useContext(AuthContext);

    // Initialize theme from localStorage or default to system preference
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("medguard-theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        // Apply theme on component mount/toggle
        if (isDark) {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("medguard-theme", "dark");
        } else {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("medguard-theme", "light");
        }
    }, [isDark]);

    return (
        <div className="settings-page fade-in-up">
            <div className="settings-header">
                <h1 className="page-title">Application Settings</h1>
                <p className="page-subtitle">Manage your platform preferences and appearance</p>
            </div>

            <div className="settings-grid">
                {/* Appearance Card */}
                <div className="settings-card premium-glass">
                    <div className="card-header">
                        <span className="card-icon">🎨</span>
                        <h3>Appearance</h3>
                    </div>
                    <div className="card-body">
                        <div className="setting-row">
                            <div className="setting-info">
                                <h4>Dark Mode</h4>
                                <p>Switch to a dark UI for low-light environments</p>
                            </div>
                            <label className="theme-switch">
                                <input
                                    type="checkbox"
                                    checked={isDark}
                                    onChange={(e) => setIsDark(e.target.checked)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Global Details Card */}
                <div className="settings-card premium-glass">
                    <div className="card-header">
                        <span className="card-icon">ℹ️</span>
                        <h3>System Details</h3>
                    </div>
                    <div className="card-body">
                        <div className="detail-row">
                            <span className="detail-label">Application Version</span>
                            <span className="detail-value">v2.1.0-alpha</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">AI Engine Engine</span>
                            <span className="detail-value gradient-text">Gemini 2.5 Flash</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Auth Token Status</span>
                            <span className="detail-value badge-success">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
