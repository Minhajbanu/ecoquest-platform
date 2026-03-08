import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <h2>EcoQuest 🌿</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <Link to="/rewards">Rewards</Link>}
        
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}


        {token && (
          <span className="logout-btn" onClick={handleLogout}>
  Logout
</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;