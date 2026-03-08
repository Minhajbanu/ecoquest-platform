

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ 1️⃣ CORS FIRST
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
app.use(cors());

// ✅ 2️⃣ JSON PARSER SECOND
app.use(express.json());

// ✅ 3️⃣ Static folder
app.use("/uploads", express.static("uploads"));

// ✅ 4️⃣ Routes AFTER middleware
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/user", userRoutes);


// ✅ 5️⃣ Test route
app.get("/", (req, res) => {
  res.send("EcoQuest API Running 🌿");
});

// ✅ 6️⃣ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));