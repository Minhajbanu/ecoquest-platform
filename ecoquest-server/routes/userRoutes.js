const express = require("express");
const router = express.Router();
//const authMiddleware = require("../middleware/authMiddleware");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Submission = require("../models/Submission");
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.get("/dashboard", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const submissions = await Submission.find({
      userId: req.user._id
    });

    res.json({
      user,
      submissions
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// Leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find()
      .select("name totalPoints level")
      .sort({ totalPoints: -1 })
      .limit(10);

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// GET PROFILE
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// UPDATE PROFILE
router.put(
  "/profile",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (req.body.name) {
        user.name = req.body.name;
      }

      if (req.file) {
        user.profilePic = `/uploads/${req.file.filename}`;
      }

      await user.save();

      res.json(user);

    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

module.exports = router;

