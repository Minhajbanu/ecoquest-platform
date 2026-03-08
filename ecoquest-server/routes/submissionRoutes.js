const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { submitTask } = require("../controllers/submissionController");

router.post("/", authMiddleware, submitTask);

module.exports = router;