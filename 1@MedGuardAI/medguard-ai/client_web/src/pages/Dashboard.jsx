// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVerified: 1240,
    accuracy: 98.7,
    expiredDetected: 35,
    illegalMedicines: 12,
    pendingVerifications: 23,
    activeUsers: 156
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, medicine: "Paracetamol 500mg", status: "Authentic", time: "2 min ago", user: "Dr. Smith" },
    { id: 2, medicine: "Amoxicillin 250mg", status: "Expired", time: "15 min ago", user: "PharmaCo" },
    { id: 3, medicine: "Ibuprofen 400mg", status: "Authentic", time: "1 hour ago", user: "City Hospital" },
    { id: 4, medicine: "Azithromycin 500mg", status: "Fake", time: "3 hours ago", user: "HealthPlus" },
    { id: 5, medicine: "Omeprazole 20mg", status: "Authentic", time: "5 hours ago", user: "MediCare" },
  ]);

  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [65, 78, 82, 95, 88, 70, 92]
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Authentic': return '#10b981';
      case 'Fake': return '#ef4444';
      case 'Expired': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your medicine verifications today.</p>
        </div>
        <div className="header-actions">
          <button className="header-btn notification-btn">
            <span className="btn-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>
          <button className="header-btn date-btn">
            <span className="btn-icon">📅</span>
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card gradient-blue">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <div className="stat-label">Total Verified</div>
            <div className="stat-value">{stats.totalVerified.toLocaleString()}</div>
            <div className="stat-trend positive">
              <span className="trend-icon">↑</span>
              <span>12% from last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-green">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-label">Accuracy Rate</div>
            <div className="stat-value">{stats.accuracy}%</div>
            <div className="stat-trend positive">
              <span className="trend-icon">↑</span>
              <span>2.5% increase</span>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-orange">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-label">Expired Detected</div>
            <div className="stat-value">{stats.expiredDetected}</div>
            <div className="stat-trend negative">
              <span className="trend-icon">↓</span>
              <span>8% decrease</span>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-red">
          <div className="stat-icon">🚫</div>
          <div className="stat-content">
            <div className="stat-label">Illegal Medicines</div>
            <div className="stat-value">{stats.illegalMedicines}</div>
            <div className="stat-trend negative">
              <span className="trend-icon">↓</span>
              <span>15% decrease</span>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-purple">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{stats.pendingVerifications}</div>
            <div className="stat-trend">
              <span>Awaiting review</span>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-cyan">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Active Users</div>
            <div className="stat-value">{stats.activeUsers}</div>
            <div className="stat-trend positive">
              <span className="trend-icon">↑</span>
              <span>24 new this week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Verifications</h3>
            <select className="chart-select">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="chart-container">
            {/* Bar Chart */}
            <div className="bar-chart">
              {chartData.labels.map((label, index) => (
                <div key={label} className="bar-item">
                  <div className="bar-label">{label}</div>
                  <div className="bar-wrapper">
                    <div 
                      className="bar-fill"
                      style={{ 
                        height: `${chartData.values[index]}%`,
                        background: `linear-gradient(180deg, #2563eb, #7c3aed)`
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">{chartData.values[index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Status Distribution</h3>
            <select className="chart-select">
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>
          <div className="pie-chart-container">
            <div className="pie-chart">
              <div className="pie-segment authentic" style={{ '--percentage': 65 }}></div>
              <div className="pie-segment fake" style={{ '--percentage': 15 }}></div>
              <div className="pie-segment expired" style={{ '--percentage': 12 }}></div>
              <div className="pie-segment illegal" style={{ '--percentage': 8 }}></div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color authentic"></span>
                <span>Authentic (65%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color fake"></span>
                <span>Fake (15%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color expired"></span>
                <span>Expired (12%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color illegal"></span>
                <span>Illegal (8%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="dashboard-bottom">
        {/* Quick Actions */}
        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <div className="action-item" onClick={() => navigate("/check")}>
              <div className="action-icon-wrapper">
                <span className="action-icon">🧪</span>
              </div>
              <div className="action-info">
                <h4>Verify Medicine</h4>
                <p>Check authenticity instantly</p>
              </div>
              <span className="action-arrow">→</span>
            </div>

            <div className="action-item" onClick={() => navigate("/history")}>
              <div className="action-icon-wrapper">
                <span className="action-icon">📜</span>
              </div>
              <div className="action-info">
                <h4>View History</h4>
                <p>Check past verifications</p>
              </div>
              <span className="action-arrow">→</span>
            </div>

            <div className="action-item">
              <div className="action-icon-wrapper">
                <span className="action-icon">📊</span>
              </div>
              <div className="action-info">
                <h4>Generate Report</h4>
                <p>Download verification report</p>
              </div>
              <span className="action-arrow">→</span>
            </div>

            <div className="action-item">
              <div className="action-icon-wrapper">
                <span className="action-icon">⚙️</span>
              </div>
              <div className="action-info">
                <h4>Settings</h4>
                <p>Configure preferences</p>
              </div>
              <span className="action-arrow">→</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity-card">
          <div className="activity-header">
            <h3>Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-status">
                  <span 
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor(activity.status) }}
                  ></span>
                </div>
                <div className="activity-details">
                  <div className="activity-title">{activity.medicine}</div>
                  <div className="activity-meta">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: getStatusColor(activity.status) + '20',
                    color: getStatusColor(activity.status)
                  }}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Verifications Table */}
      <div className="recent-verifications">
        <div className="table-header">
          <h3>Recent Verifications</h3>
          <button className="export-btn">
            <span className="btn-icon">📥</span>
            Export Data
          </button>
        </div>
        <div className="table-container">
          <table className="verification-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Verified By</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paracetamol 500mg</td>
                <td><span className="status-badge authentic">Authentic</span></td>
                <td>98.5%</td>
                <td>Dr. Sarah Johnson</td>
                <td>2024-01-15</td>
                <td><button className="table-action">View</button></td>
              </tr>
              <tr>
                <td>Amoxicillin 250mg</td>
                <td><span className="status-badge expired">Expired</span></td>
                <td>95.2%</td>
                <td>City Hospital</td>
                <td>2024-01-15</td>
                <td><button className="table-action">View</button></td>
              </tr>
              <tr>
                <td>Ibuprofen 400mg</td>
                <td><span className="status-badge authentic">Authentic</span></td>
                <td>99.1%</td>
                <td>PharmaCo</td>
                <td>2024-01-14</td>
                <td><button className="table-action">View</button></td>
              </tr>
              <tr>
                <td>Azithromycin 500mg</td>
                <td><span className="status-badge fake">Fake</span></td>
                <td>97.8%</td>
                <td>HealthPlus</td>
                <td>2024-01-14</td>
                <td><button className="table-action">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}