// // const express = require("express");
// // const router = express.Router();

// // const {
// //   getAddresses,
// //   addAddress,
// //   updateAddress,
// //   deleteAddress,
// //   setDefaultAddress,
// // } = require("../controllers/addressController");


// // const { protect } = require("../middleware/authMiddleware");


// // // =========================================
// // // Address Routes
// // // =========================================


// // // Get all addresses
// // router.get(
// //   "/",
// //   protect,
// //   getAddresses
// // );


// // // Add new address
// // router.post(
// //   "/",
// //   protect,
// //   addAddress
// // );


// // // Update address
// // router.put(
// //   "/:id",
// //   protect,
// //   updateAddress
// // );


// // // Delete address
// // router.delete(
// //   "/:id",
// //   protect,
// //   deleteAddress
// // );


// // // Set default address
// // router.put(
// //   "/default/:id",
// //   protect,
// //   setDefaultAddress
// // );


// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");

// const {
//   getAddresses,
//   addAddress,
//   updateAddress,
//   deleteAddress,
//   setDefaultAddress,
// } = require("../controllers/addressController");

// // =========================================
// // Get All User Addresses
// // GET /api/address
// // =========================================
// router.get("/", authMiddleware, getAddresses);

// // =========================================
// // Add New Address
// // POST /api/address
// // =========================================
// router.post("/", authMiddleware, addAddress);

// // =========================================
// // Update Address
// // PUT /api/address/:id
// // =========================================
// router.put("/:id", authMiddleware, updateAddress);

// // =========================================
// // Delete Address
// // DELETE /api/address/:id
// // =========================================
// router.delete("/:id", authMiddleware, deleteAddress);

// // =========================================
// // Set Default Address
// // PUT /api/address/default/:id
// // =========================================
// router.put("/default/:id", authMiddleware, setDefaultAddress);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController");

// =========================================
// Address Routes
// =========================================

// Get all addresses
router.get("/", protect, getAddresses);

// Add new address
router.post("/", protect, addAddress);

// Update address
router.put("/:id", protect, updateAddress);

// Delete address
router.delete("/:id", protect, deleteAddress);

// Set default address
router.put("/default/:id", protect, setDefaultAddress);

module.exports = router;