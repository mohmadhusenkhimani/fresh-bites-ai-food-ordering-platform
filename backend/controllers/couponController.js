const Coupon = require("../models/Coupon");

// ================= CREATE COUPON =================
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minimumAmount,
      maximumDiscount,
      expiryDate,
      usageLimit,
      isActive,
    } = req.body;

    // Validate required fields
    if (
      !code ||
      !discountType ||
      !discountValue ||
      !expiryDate ||
      !usageLimit
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check if coupon already exists
    const existingCoupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists.",
      });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minimumAmount,
      maximumDiscount,
      expiryDate,
      usageLimit,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Create Coupon Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET ALL COUPONS =================
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET SINGLE COUPON =================
const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPDATE COUPON =================
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully.",
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DELETE COUPON =================
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const SHIPPING_FEE = 30;

const roundMoney = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

/**
 * Discount from the stored coupon rules.
 * Caps the discount at the cart subtotal so totals cannot go negative.
 */
const calculateCouponDiscount = (coupon, cartTotal) => {
  const subtotal = roundMoney(cartTotal);
  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount = (subtotal * Number(coupon.discountValue)) / 100;

    if (
      Number(coupon.maximumDiscount) > 0 &&
      discount > Number(coupon.maximumDiscount)
    ) {
      discount = Number(coupon.maximumDiscount);
    }
  }

  if (coupon.discountType === "fixed") {
    discount = Number(coupon.discountValue);
  }

  if (!Number.isFinite(discount) || discount < 0) {
    discount = 0;
  }

  if (discount > subtotal) {
    discount = subtotal;
  }

  discount = roundMoney(discount);

  return {
    discount,
    finalTotal: roundMoney(subtotal - discount),
    shippingFee: SHIPPING_FEE,
    payableTotal: roundMoney(subtotal - discount + SHIPPING_FEE),
  };
};

/**
 * Shared coupon check used by the apply API and order placement.
 * Does not increment usage. Orders reserve usage only after validation.
 */
const evaluateCoupon = async (code, cartTotal) => {
  if (
    !code ||
    cartTotal === undefined ||
    cartTotal === null ||
    Number.isNaN(Number(cartTotal))
  ) {
    return {
      success: false,
      status: 400,
      message: "Coupon code and cart total are required.",
    };
  }

  const subtotal = roundMoney(cartTotal);

  if (subtotal < 0) {
    return {
      success: false,
      status: 400,
      message: "Invalid cart total.",
    };
  }

  const coupon = await Coupon.findOne({
    code: String(code).trim().toUpperCase(),
  });

  if (!coupon) {
    return {
      success: false,
      status: 404,
      message: "Invalid coupon code.",
    };
  }

  if (!coupon.isActive) {
    return {
      success: false,
      status: 400,
      message: "This coupon is inactive.",
    };
  }

  if (new Date() > new Date(coupon.expiryDate)) {
    return {
      success: false,
      status: 400,
      message: "Coupon has expired.",
    };
  }

  if (subtotal < Number(coupon.minimumAmount || 0)) {
    return {
      success: false,
      status: 400,
      message: `Minimum order amount is ₹${coupon.minimumAmount}.`,
    };
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    return {
      success: false,
      status: 400,
      message: "Coupon usage limit reached.",
    };
  }

  const amounts = calculateCouponDiscount(coupon, subtotal);

  return {
    success: true,
    status: 200,
    message: "Coupon applied successfully.",
    coupon,
    ...amounts,
  };
};

// ================= APPLY COUPON =================
const applyCoupon = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { code, cartTotal } = req.body;

    const result = await evaluateCoupon(code, cartTotal);

    if (!result.success) {
      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    }

    res.status(200).json({
      success: true,
      message: result.message,
      coupon: result.coupon.code,
      discount: result.discount,
      finalTotal: result.finalTotal,
      shippingFee: result.shippingFee,
      payableTotal: result.payableTotal,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  evaluateCoupon,
  calculateCouponDiscount,
  SHIPPING_FEE,
  roundMoney,
};