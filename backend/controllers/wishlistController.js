const Wishlist = require("../models/Wishlist");

// =========================
// Add item to wishlist
// POST /api/wishlist
// =========================
const addToWishlist = async (req, res) => {
  try {
    const { foodId } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user._id,
      food: foodId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Food already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      food: foodId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get logged in user's wishlist
// GET /api/wishlist
// =========================
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("food");

    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Remove item from wishlist
// DELETE /api/wishlist/:foodId
// =========================
const removeWishlist = async (req, res) => {
  try {
    console.log("User:", req.user._id);
    console.log("Food ID:", req.params.foodId);

    const deleted = await Wishlist.findOneAndDelete({
      user: req.user._id,
      food: req.params.foodId,
    });

    console.log("Deleted:", deleted);

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};