// const express = require("express");
// const router = express.Router();

// // const { signup, login, getMe } = require("../controllers/authController");
// const {
//   signup,
//   login,
//   googleLogin,
//   getMe,
// } = require("../controllers/authController");
// //const { signup } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/google", googleLogin);
// router.get("/me", protect, getMe);

// module.exports = router; 

const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  googleLogin,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);

// Email Verification
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
// User Profile
router.get("/me", protect, getMe);

module.exports = router;