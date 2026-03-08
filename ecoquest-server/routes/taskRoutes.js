

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Task = require("../models/Task");

// Hardcoded tasks
const tasks = [
  {
    id: "essay",
    title: "Environmental Essay",
    description: "Write an essay about any environmental issue",
    points: 100
  },
  {
    id: "tree",
    title: "Plant a Tree",
    description: "Plant a tree and upload a geotag photo",
    points: 150
  }
];

// GET tasks
router.get("/", (req, res) => {
  res.json(tasks);
});


// COMPLETE TASK


   router.post("/submit/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { essayText } = req.body;

    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const user = req.user;

    const existing = await Submission.findOne({
      userId: user._id,
      taskId: id
    });

    if (existing) {
      return res.status(400).json({ message: "Task already submitted" });
    }

    // Basic validation
    if (id === "essay" && !essayText) {
      return res.status(400).json({ message: "Essay text required" });
    }

    await Submission.create({
      userId: user._id,
      taskId: id,
      taskTitle: task.title,
      taskPoints: task.points
    });

    user.totalPoints += task.points;
    user.level = Math.floor(user.totalPoints / 300) + 1;

    // ===== REWARD LOGIC =====

if (task.id === "essay") {
  if (!user.rewards.includes("Eco Writer Badge")) {
    user.rewards.push("Eco Writer Badge");
  }
}

if (task.id === "tree") {
  if (!user.rewards.includes("Tree Guardian Badge")) {
    user.rewards.push("Tree Guardian Badge");
  }
}

if (user.totalPoints >= 200) {
  if (!user.rewards.includes("Green Achiever")) {
    user.rewards.push("Green Achiever");
  }
}

if (user.level >= 3) {
  if (!user.rewards.includes("Eco Champion")) {
    user.rewards.push("Eco Champion");
  }
}

    await user.save();

    res.json({ message: "Task submitted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
   // COMPLETE TASK

   module.exports = router;
