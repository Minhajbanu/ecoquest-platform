import { useEffect, useState } from "react";
import API from "../services/api";
import ProgressBar from "../components/ProgressBar";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) return <div className="container">Loading...</div>;
  const { user, submissions } = data;
 
  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome back, {user.name} 🌿</h1>
        <p>Keep making the planet greener 🌍</p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🏆 Level</h3>
          <p>{user.level}</p>
        </div>

        <div className="stat-card">
          <h3>⭐ Total Points</h3>
          <p>{user.totalPoints}</p>
        </div>

        <div className="stat-card">
          <h3>✅ Tasks Completed</h3>
          <p>{submissions.length}</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <h2>Your Progress</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(user.totalPoints / 600) * 100}%` }}
          ></div>
        </div>
        <p>{user.totalPoints} / 600 points to max level</p>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h2>Recent Activity</h2>

        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          submissions.slice(0, 3).map((sub) => (
            <div key={sub._id} className="activity-card">
              <h4>{sub.taskId?.title}</h4>
              <p>Points Earned: {sub.taskId?.points}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;