// // const jwt = require("jsonwebtoken"); 
// // const User = require("../models/User");

// // const generateToken = (id) => {
// //     return jwt.sign({ id }, process.env.JWT_SECRET, {   
// //         expiresIn: process.env.JWT_EXPIRES_IN || "7d"
// //     });
// // };

// // // @desc    Register new user
// // // @route   POST /api/auth/signup
// // // @access  Public
// // const signup = async (req, res) => {
// //     try{
// //         console.log(req.body);
// //         const { fullname, email, password } = req.body;

// //         if(!fullname || !email || !password){   
// //             return res.status(400).json({ error: "Please provide all required fields" });
// //         }

// //         const existingUser = await User.findOne({ email });
// //         if(existingUser){
// //             return res.status(400).json({ error: "Email already in use" });
// //         }

// //         const user = await User.create({ fullname, email, password });

// //         const token = generateToken(user._id);

// //         res.status(201).json({
// //             success: true,
// //             message: "User registered successfully",
// //             token,
// //             user: {
// //                 id: user._id,
// //                 fullName: user.fullname,
// //                 email: user.email
// //             },
// //         });
// //     }
// //     catch(err){
// //         console.error(err);
// //         res.status(500).json({ error: "Server error" });
// //     }
// // }
// // // module.exports = { signup, login, getMe };
// // module.exports = { signup }; 

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   });
// };

// // @desc    Register new user
// // @route   POST /api/auth/signup
// // @access  Public
// const signup = async (req, res) => {
//   try {
//     const { fullName, email, password } = req.body;

//     if (!fullName || !email || !password) {
//       return res.status(400).json({ success: false, message: "Please fill all fields" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     const user = await User.create({ fullName, email, password });

//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: "Signup successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Please enter email and password" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid Email or Password" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid Email or Password" });
//     }

//     const token = generateToken(user._id);

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Get current user profile
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   res.json({
//     success: true,
//     user: {
//       id: req.user._id,
//       fullName: req.user.fullName,
//       email: req.user.email,
//     },
//   });
// };

// module.exports = { signup, login, getMe };

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
// const admin = require("../firebaseAdmin");
const { getAuth } = require("firebase-admin/auth");
require("../firebaseAdmin");

const sendVerificationEmail = require("../utils/sendVerificationEmail");

const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// =========================
// Signup
// =========================
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      fullName,
      email,
      password,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });


    // 👇 Add the console.log HERE
    console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
    
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    await sendVerificationEmail(
      user.email,
      user.fullName,
      verificationLink
    );

    res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
    });
  }catch (error) {
  console.error("Signup Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
  }
};

// =========================
// Login
// =========================
// =========================
// Login
// =========================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // ==========================
    // Check Email Verification
    // ==========================
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before logging in.",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =========================
// Google Login
// =========================
// =========================
// Google Login
// =========================
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    // Verify Firebase ID Token
    const decoded = await getAuth().verifyIdToken(idToken);

    const email = decoded.email;
    const fullName = decoded.name || "Google User";

    let user = await User.findOne({ email });

    // ==========================
    // New Google User
    // ==========================
    if (!user) {
      user = await User.create({
        fullName,
        email,
        password: Math.random().toString(36).slice(-10),

        // Google emails are already verified
        isVerified: true,
      });
    }

    // ==========================
    // Old account but not verified
    // ==========================
    if (!user.isVerified) {
      user.isVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpires = null;

      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};  

// =========================
// Verify Email
// =========================
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or has expired.",
      });
    }

    // Verify the user
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Resend Verification Email
// =========================
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    await sendVerificationEmail(
      user.email,
      user.fullName,
      verificationLink
    );

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// Forgot Password
// =========================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendResetPasswordEmail(
      user.email,
      user.fullName,
      resetLink
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Reset Password
// =========================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired.",
      });
    }

    user.password = password;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Profile
// =========================
const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
    },
  });
};

module.exports = {
  signup,
  login,
  googleLogin,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
};