import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
    const { user } = useContext(AuthContext);

    const getAvatarUrl = () => {
        if (user?.profile?.avatar) {
            // If it's a relative URL, prepend the backend host
            if (user.profile.avatar.startsWith('/media/')) {
                return `http://localhost:5000${user.profile.avatar}`;
            }
            return user.profile.avatar;
        }
        return null;
    };

    return (
        <div className="profile-page fade-in-up">
            <div className="profile-header">
                <h1 className="page-title">User Profile</h1>
            </div>

            <div className="profile-card premium-glass">
                <div className="profile-cover"></div>

                <div className="profile-content">
                    <div className="profile-avatar-wrapper">
                        {getAvatarUrl() ? (
                            <img src={getAvatarUrl()} alt="User Avatar" className="profile-img" />
                        ) : (
                            <div className="profile-placeholder">👤</div>
                        )}
                        <div className="status-indicator online"></div>
                    </div>

                    <div className="profile-details">
                        <h2>{user?.username}</h2>
                        <p className="profile-email">{user?.profile?.email || "No email provided"}</p>

                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Phone</span>
                                <span className="info-value">{user?.profile?.phone || "Not set"}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Role / Bio</span>
                                <span className="info-value bio-text">{user?.profile?.bio || "No biography provided."}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
