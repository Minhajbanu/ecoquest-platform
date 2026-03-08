// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   points: {
//     type: Number,
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  createdBy: {
    type: String,
    default: "Teacher"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
