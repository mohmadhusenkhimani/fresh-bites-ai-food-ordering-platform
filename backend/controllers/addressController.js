const User = require("../models/User");

// =========================================
// Get All Addresses
// GET /api/user/address
// =========================================
const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Get Addresses Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// Add Address
// POST /api/user/address
// =========================================
const addAddress = async (req, res) => {
  try {
    const {
      type,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      landmark,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFirstAddress = user.addresses.length === 0;

    const newAddress = {
      type,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      landmark,
      isDefault: isFirstAddress,
    };

    user.addresses.push(newAddress);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Add Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// Update Address
// PUT /api/user/address/:id
// =========================================
const updateAddress = async (req, res) => {
  try {
    const {
      type,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      landmark,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.type = type;
    address.fullName = fullName;
    address.phone = phone;
    address.street = street;
    address.city = city;
    address.state = state;
    address.pincode = pincode;
    address.landmark = landmark;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Update Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// Delete Address
// DELETE /api/user/address/:id
// =========================================
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const wasDefault = address.isDefault;

    address.deleteOne();

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Delete Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =========================================
// Set Default Address
// PUT /api/user/address/default/:id
// =========================================
const setDefaultAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });

    address.isDefault = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Set Default Address Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};