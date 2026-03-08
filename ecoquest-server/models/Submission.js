


const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  taskId: {
    type: String, // 🔥 store string id like "essay"
  },
  taskTitle: String,
  taskPoints: Number,
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "approved" // auto approve for now
  }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);