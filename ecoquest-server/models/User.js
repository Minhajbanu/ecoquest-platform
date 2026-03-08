const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  tasksCompleted: {
    type: Number,
    default: 0
  },
  rewards: {
  type: [String],
  default: []
  },
  profilePic: {
  type: String,
  default: ""
 }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);