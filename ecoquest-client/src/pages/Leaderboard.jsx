


import { useEffect, useState } from "react";
import API from "../services/api";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/leaderboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>🏆 EcoQuest Leaderboard</h1>

      {users.length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        <div className="leaderboard-list">
          {users.map((user, index) => (
            <div
              key={user._id}
              className={`leaderboard-card ${index < 3 ? "top-three" : ""}`}
            >
              <div className="rank">
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index > 2 && `#${index + 1}`}
              </div>

              <div className="user-info">
                <h3>{user.name}</h3>
                <p>Level {user.level}</p>
              </div>

              <div className="points">
                ⭐ {user.totalPoints}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;