

import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [essayText, setEssayText] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const res = await API.get("/tasks");
      setTasks(res.data);
    };
    loadTasks();
  }, []);

  const submitTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/tasks/submit/${selectedTask.id}`,
        { essayText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Task submitted! Points added 🎉");
      setSelectedTask(null);
      setEssayText("");

    } catch (err) {
      alert(err.response?.data?.message || "Error submitting task");
    }
  };

  return (
    <div className="tasks-container">
      <h1>🌿 Eco Challenges</h1>

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <button onClick={() => setSelectedTask(task)}>
              View Task
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="task-modal">
          <div className="modal-content">
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>

            {selectedTask.id === "essay" && (
              <textarea
                placeholder="Write your essay here..."
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
              />
            )}

            {selectedTask.id === "tree" && (
              <input type="file" />
            )}

            <button onClick={submitTask}>Submit Task</button>
            <button onClick={() => setSelectedTask(null)}>Close</button>
          </div>
        </div>
      )} 
    </div>
  );
}

export default Tasks;
