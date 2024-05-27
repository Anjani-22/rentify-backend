// routes/interested.js

const express = require("express");
const router = express.Router();
const {
  sendInterestedEmail,
} = require("./../controllers/interestedController");
const { protect } = require("./../middleware/authMiddleware");

// POST /api/interested
router.post("/", protect, sendInterestedEmail);

module.exports = router;
