// const express = require('express');
// const router = express.Router();
// const { placeOrder, getOrders, getOrderById, updateOrderStatus, cancelOrder, getMyOrders } = require('../controllers/orderController');
// const { protect } = require('../middleware/authMiddleware');
// const {
//   getRecentOrders,
// } = require("../controllers/orderController");
// router.post('/', protect, placeOrder);
// router.get('/my', protect, getMyOrders);
// router.get('/:id', protect, getOrderById);
// router.get("/recent", getRecentOrders);
// router.put('/:id/status', protect, updateOrderStatus);
// router.put('/:id/cancel', protect, cancelOrder);

// module.exports = router;
const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getOrderById,
  downloadInvoice,
  updateOrderStatus,
  cancelOrder,
  getMyOrders,
  getRecentOrders,
} = require("../controllers/orderController");

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, placeOrder);
// router.get('/', protect, getOrders);
router.get('/', getOrders); // Admin route to get all orders
router.get('/my', protect, getMyOrders);
router.get('/recent', getRecentOrders);
router.get(
  "/:id/invoice",
  protect,
  downloadInvoice
);
router.get('/:id', protect, getOrderById);
// router.put('/:id/status', protect, updateOrderStatus);
router.put('/:id/status', updateOrderStatus); // Admin route to update order status
// router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/cancel', cancelOrder); // User route to cancel order

module.exports = router;