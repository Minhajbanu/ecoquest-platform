const Submission = require("../models/Submission");
const Task = require("../models/Task");
const User = require("../models/User");

exports.submitTask = async (req, res) => {
  const { taskId, proofImage } = req.body;

  try {
    const task = await Task.findById(taskId);
    const user = await User.findById(req.user);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Create submission
    const submission = await Submission.create({
      userId: req.user,
      taskId,
      proofImage,
      status: "approved" // For now auto-approve (can change later)
    });

    // Add points
    user.totalPoints += task.points;
    user.tasksCompleted += 1;

    // Level Calculation
    if (user.totalPoints >= 600) {
      user.level = 4;
    } else if (user.totalPoints >= 300) {
      user.level = 3;
    } else if (user.totalPoints >= 100) {
      user.level = 2;
    } else {
      user.level = 1;
    }
    // Certificate Unlock Logic
if (user.level === 2 && !user.certificates.includes("Bronze")) {
  user.certificates.push("Bronze");
}

if (user.level === 3 && !user.certificates.includes("Silver")) {
  user.certificates.push("Silver");
}

if (user.level === 4 && !user.certificates.includes("Gold")) {
  user.certificates.push("Gold");
}

    await user.save();

    res.status(201).json({
      message: "Task Submitted Successfully",
      submission,
      newLevel: user.level,
      totalPoints: user.totalPoints
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};