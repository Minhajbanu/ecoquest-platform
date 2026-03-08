// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Rewards() {
//   const [certificates, setCertificates] = useState([]);

//   useEffect(() => {
//     const fetchRewards = async () => {
//       const token = localStorage.getItem("token");

//       const res = await API.get("/user/dashboard", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setCertificates(res.data.user.certificates);
//     };

//     fetchRewards();
//   }, []);

//   return (
//     <div className="container">
//       <h1>My Rewards 🏆</h1>

//       {certificates.length === 0 ? (
//         <p>No certificates unlocked yet.</p>
//       ) : (
//         certificates.map((cert, index) => (
//           <div key={index} className="card">
//             <h3>{cert} Certificate 🎉</h3>
//             <p>Congratulations! You unlocked the {cert} level.</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Rewards;

import { useEffect, useState } from "react";
import API from "../services/api";

function Rewards() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRewards(res.data.user.rewards);
    };

    fetchRewards();
  }, []);

  return (
    <div className="rewards-container">
      <h1>🎁 Your Rewards</h1>

      {rewards.length === 0 ? (
        <p>No rewards unlocked yet. Complete tasks to earn badges!</p>
      ) : (
        <div className="rewards-grid">
          {rewards.map((reward, index) => (
            <div key={index} className="reward-card">
              <h3>🏅 {reward}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rewards;