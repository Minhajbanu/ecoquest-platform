// import { useState } from "react";
// import API from "../services/api";

// function AdminDashboard() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [points, setPoints] = useState("");

//   const token = localStorage.getItem("token");

//   const handleCreate = async () => {
//     await API.post("/tasks/create",
//       { title, description, points },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     alert("Task Created!");
//     setTitle("");
//     setDescription("");
//     setPoints("");
//   };

//   return (
//     <div>
//       <h1>Teacher Dashboard</h1>

//       <input
//         placeholder="Task Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         placeholder="Task Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Points"
//         value={points}
//         onChange={(e) => setPoints(e.target.value)}
//       />

//       <button onClick={handleCreate}>
//         Create Task
//       </button>
//     </div>
//   );
// }

// export default AdminDashboard;