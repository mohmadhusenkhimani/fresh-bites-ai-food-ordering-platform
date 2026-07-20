const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// Get logged-in user's wishlist
router.get("/", protect, getWishlist);

// Add food to wishlist
router.post("/", protect, addToWishlist);

// Remove food from wishlist
router.delete("/:foodId", protect, removeWishlist);

module.exports = router;