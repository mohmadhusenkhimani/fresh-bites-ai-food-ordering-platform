const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
  getAverageRating,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Add Review
router.post("/", protect, addReview);

// Average Rating (KEEP THIS ABOVE /:foodId)
router.get("/average/:foodId", getAverageRating);

// Get Reviews
router.get("/:foodId", getReviews);

// Update Review
router.put("/:id", protect, updateReview);

// Delete Review
router.delete("/:id", protect, deleteReview);

module.exports = router;