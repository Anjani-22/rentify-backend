const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("./../controllers/userController");
const protect = require("./../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
