const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { registerValidator, loginValidator } = require("../validators/authValidator");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerValidator, register);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post("/login", loginValidator, login);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get("/me", protect, getMe);

module.exports = router;