
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();

// const dashboardRoutes = require("./routes/dashboard");
// const userRoutes = require("./routes/users");
// const reviewRoutes = require("./routes/reviewRoutes");
// const addressRoutes = require("./routes/addressRoutes");
// const reviewAIRoute = require("./routes/reviewAIRoute");

// const aiInsightsRoute = require("./routes/aiInsightsRoute");
// const aiMlAnalyticsRoute = require("./routes/aiMlAnalyticsRoute");

// connectDB();

// const app = express();


// // ================= Middleware =================

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   })
// );


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // ================= API Routes =================

// app.use("/api/auth", require("./routes/auth"));

// app.use("/api/admin", require("./routes/adminRoute"));

// app.use("/api/foods", require("./routes/foods"));

// app.use("/api/orders", require("./routes/orders"));
// app.use("/api/newsletter", require("./routes/newsletter"));


// // Dashboard
// app.use("/api/dashboard", dashboardRoutes);


// // Users
// app.use("/api/users", userRoutes);


// // ================= Address Routes =================
// // Multiple Delivery Addresses
// // Home | Office | Other

// app.use("/api/user/address", addressRoutes);


// // Coupon Routes
// app.use("/api/coupons", require("./routes/couponRoutes"));


// app.use("/api/contact", require("./routes/contact"));

// app.use("/api/wishlist", require("./routes/wishlist"));

// app.use("/api/reviews", reviewRoutes);

// app.use("/api/admin/ai-insights", aiInsightsRoute);

// app.use(
//   "/api/review-ai",
//   reviewAIRoute
// );

// app.use("/api/ai-ml", aiMlAnalyticsRoute);

// app.use("/api/chatbot", require("./routes/chatbotRoute"));

// // ================= Root Route =================

// app.get("/", (req, res) => {
//   res.send("Welcome to FreshBites API");
// });



// // ================= Start Server =================

// const PORT = process.env.PORT || 5000;


// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   res.status(500).json({
//     success: false,
//     message: err.message,
//   });
// });



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// ================= Routes =================

const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviewRoutes");
const addressRoutes = require("./routes/addressRoutes");
const reviewAIRoute = require("./routes/reviewAIRoute");

const aiInsightsRoute = require("./routes/aiInsightsRoute");
const aiMlAnalyticsRoute = require("./routes/aiMlAnalyticsRoute");

// ================= Database =================

connectDB();

// ================= Express App =================

const app = express();

// ================= CORS Configuration =================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean).map((url) => url.replace(/\/+$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (e.g. server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ================= Body Parsers =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= API Routes =================

app.use("/api/auth", require("./routes/auth"));

app.use("/api/admin", require("./routes/adminRoute"));

app.use("/api/foods", require("./routes/foods"));

app.use("/api/orders", require("./routes/orders"));

app.use("/api/newsletter", require("./routes/newsletter"));

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Users
app.use("/api/users", userRoutes);

// Address Routes
app.use("/api/user/address", addressRoutes);

// Coupon Routes
app.use("/api/coupons", require("./routes/couponRoutes"));

// Contact
app.use("/api/contact", require("./routes/contact"));

// Wishlist
app.use("/api/wishlist", require("./routes/wishlist"));

// Reviews
app.use("/api/reviews", reviewRoutes);

// AI Insights
app.use("/api/admin/ai-insights", aiInsightsRoute);

// Review AI
app.use("/api/review-ai", reviewAIRoute);

// AI/ML Analytics
app.use("/api/ai-ml", aiMlAnalyticsRoute);

// Chatbot
app.use("/api/chatbot", require("./routes/chatbotRoute"));

// ================= Root Route =================

app.get("/", (req, res) => {
  res.send("Welcome to FreshBites API");
});

// ================= 404 Handler =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ================= Error Handler =================

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS error: Origin not allowed",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ================= Start Server =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("Allowed CORS origins:", allowedOrigins);
});
