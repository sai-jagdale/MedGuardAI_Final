import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "./SetupProfile.css";

export default function SetupProfile() {
    const { user, updateProfileContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("bio", bio);
        formData.append("is_first_login", "False"); // Update flag
        if (avatar) {
            formData.append("avatar", avatar);
        }

        try {
            const res = await API.put("/api/auth/profile/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            // Update local context
            updateProfileContext(res.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Profile setup failed", error);
            alert("Failed to save profile details");
        }

        setLoading(false);
    };

    return (
        <div className="setup-page">
            <div className="setup-container fade-in-up">
                <div className="setup-header">
                    <span className="welcome-badge">Welcome! 🎉</span>
                    <h1>Let's setup your profile</h1>
                    <p>Please provide a few details to personalize your MedGuard AI experience.</p>
                </div>

                <form onSubmit={handleSubmit} className="setup-form">
                    <div className="avatar-upload-section">
                        <div className="avatar-preview">
                            {preview ? (
                                <img src={preview} alt="Avatar Preview" />
                            ) : (
                                <div className="avatar-placeholder">👤</div>
                            )}
                        </div>
                        <label className="btn-secondary small">
                            Upload Avatar
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Bio or Role</label>
                        <textarea
                            placeholder="e.g., Lead Pharmacist at General Hospital"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary large full-width"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Complete Setup →"}
                    </button>
                </form>
            </div>
        </div>
    );
}
