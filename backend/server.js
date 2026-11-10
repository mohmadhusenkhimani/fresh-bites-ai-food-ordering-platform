
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviewRoutes");
const addressRoutes = require("./routes/addressRoutes");
const reviewAIRoute = require("./routes/reviewAIRoute");

const aiInsightsRoute = require("./routes/aiInsightsRoute");
const aiMlAnalyticsRoute = require("./routes/aiMlAnalyticsRoute");

connectDB();

const app = express();


// ================= Middleware =================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);


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


// ================= Address Routes =================
// Multiple Delivery Addresses
// Home | Office | Other

app.use("/api/user/address", addressRoutes);


// Coupon Routes
app.use("/api/coupons", require("./routes/couponRoutes"));


app.use("/api/contact", require("./routes/contact"));

app.use("/api/wishlist", require("./routes/wishlist"));

app.use("/api/reviews", reviewRoutes);

app.use("/api/admin/ai-insights", aiInsightsRoute);

app.use(
  "/api/review-ai",
  reviewAIRoute
);

app.use("/api/ai-ml", aiMlAnalyticsRoute);

app.use("/api/chatbot", require("./routes/chatbotRoute"));

// ================= Root Route =================

app.get("/", (req, res) => {
  res.send("Welcome to FreshBites API");
});



// ================= Start Server =================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

