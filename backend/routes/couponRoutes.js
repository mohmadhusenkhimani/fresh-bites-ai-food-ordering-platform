const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} = require("../controllers/couponController");

// Create Coupon
router.post("/", createCoupon);

// Get All Coupons
router.get("/", getCoupons);

// Apply Coupon
router.post("/apply", applyCoupon);

// Get Single Coupon
router.get("/:id", getCoupon);

// Update Coupon
router.put("/:id", updateCoupon);

// Delete Coupon
router.delete("/:id", deleteCoupon);

module.exports = router;