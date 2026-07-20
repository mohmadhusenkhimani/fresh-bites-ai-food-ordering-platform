// const Order = require("../models/Order");
// const sendOrderEmail = require("../utils/sendOrderEmail");

// const getEstimatedDelivery = () => {
//     const d = new Date();
//     d.setMinutes(d.getMinutes() + 45); // Default delivery time is 45 mins from order
//     return d;
// }

// const initializeTracking = (status, message) => ({
//     status,
//     message,
//     timestamp: new Date(),
// });


// // @desc    Place a new order
// // @route   POST /api/orders
// // @access  Private
// const placeOrder = async (req, res) => {
//       console.log("🚀 PLACE ORDER API HIT");

//     try{
//         // const { items, shippingAddress } = req.body;
//         const { items, shippingAddress, paymentMethod } = req.body;

//         // console.log("REQ BODY:", req.body);
// console.log("paymentMethod:", paymentMethod);
//         if(!items || items.length === 0){
//             return res.status(400).json({ success: false, message: "Order must contain at least one item" });
//         }
//         const requiredFields = ["name", "email", "phone", "country", "city", "postalCode"];
//         for(const field of requiredFields){
//             if(!shippingAddress?.[field]){
//                 return res.status(400).json({ success: false, message: `Shipping address missing field: ${field}` });
//             }
//         }
//         const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         const shippingFee = 30; // Flat shipping fee
//         const total = subtotal + shippingFee;

//         console.log("Shipping Address:", shippingAddress);
// console.log("Email Received:", shippingAddress.email);

//         // const order = await Order.create({
//         //     user: req.user._id,
//         //     items,
//         //     shippingAddress,
//         //     subtotal,
//         //     shippingFee,
//         //     total,
//         //     paymentStatus: "Paid", // Assuming payment is successful for this example
//         //     estimatedDelivery: getEstimatedDelivery(),
//         //     trackingHistory: [initializeTracking("pending", "Order placed and awaiting confirmation")],
//         // });

//         const order = await Order.create({
//     user: req.user._id,
//     items,
//     shippingAddress,
//     subtotal,
//     shippingFee,
//     total,

//     // NEW
//     paymentMethod,

//     // paymentStatus: "Paid",
//    paymentStatus: paymentMethod === "COD" ? "UnPaid" : "Paid",
//     estimatedDelivery: getEstimatedDelivery(),
//     trackingHistory: [
//         initializeTracking(
//             "pending",
//             "Order placed and awaiting confirmation"
//         ),
//     ],
// });

//         console.log("Saved Email:", order.shippingAddress.email);
//         console.log("Saved payment method:", order.paymentMethod);
//         console.log("Saved payment status:", order.paymentStatus);

//         setTimeout(async () => {
//     try {
//         const o = await Order.findById(order._id);

//         if (o && o.status === "pending") {

//             o.status = "confirmed";

//             o.trackingHistory.push(
//                 initializeTracking(
//                     "confirmed",
//                     "Order confirmed and being prepared"
//                 )
//             );

//             await o.save();

            
//             console.log("ABOUT TO SEND EMAIL");
// console.log("Email:", order.shippingAddress.email);


//             await sendOrderEmail(
                
//                 o.shippingAddress.email,
//                 "Order Confirmed ✅",
//                 `
//                 <h2>Hello ${o.shippingAddress.name}</h2>

//                 <p>Your order has been confirmed.</p>

//                 <p>
//                     Order ID:
//                     <strong>${o._id}</strong>
//                 </p>

//                 <p>
//                     Our kitchen has started preparing your food.
//                 </p>

//                 <br>

//                 <p>
//                     Thank you for ordering from
//                     <strong>Fresh Bites</strong>
//                 </p>
//                 `
//             );
//         }

//     } catch (err) {
//         console.error("Error auto-confirming order:", err);
//     }
// }, 10000);

//         res.status(201).json({ success: true, orderId: order._id, message: "Order placed successfully" });
//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// // @desc    Get logged-in user's orders
// // @route   GET /api/orders/my
// // @access  Private
// const getMyOrders = async (req, res) => {
//     try{
//         const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
//         res.json({ success: true, count: orders.length, orders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// // @desc    Get single order (with tracking)
// // @route   GET /api/orders/:id
// // @access  Private
// const getOrderById = async (req, res) => {
//     try{
//         const order = await Order.findById(req.params.id).populate("user", "fullName email");
//         if(!order){
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }
//         if(order.user._id.toString() !== req.user._id.toString()){
//             return res.status(403).json({ success: false, message: "Not authorized to view this order" });
//         }
//         res.json({ success: true, order });
//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// // @desc    Update Order Status (Admin)
// // @route   PUT /api/orders/:id/status
// const updateOrderStatus = async (req, res) => {
//     try {
//         const { status } = req.body;

//         const order = await Order.findById(req.params.id);

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Order not found",
//             });
//         }

//         order.status = status;

//         order.trackingHistory.push({
//             status,
//             message: `Order status changed to ${status}`,
//             timestamp: new Date(),
//         });

//         await order.save();

//         // ==========================
//         // STATUS EMAIL NOTIFICATIONS
//         // ==========================

//         if (status === "preparing") {

//             console.log("ABOUT TO SEND EMAIL");
// console.log("Email:", order.shippingAddress.email);

//             await sendOrderEmail(
//                 order.shippingAddress.email,
//                 "Your Order is Being Prepared 👨‍🍳",
//                 `
//                 <h2>Hello ${order.shippingAddress.name}</h2>

//                 <p>Your order is now being prepared by our kitchen.</p>

//                 <p><strong>Order ID:</strong> ${order._id}</p>

//                 <p>We'll notify you when it is out for delivery.</p>

//                 <br>

//                 <p>Fresh Bites Team ❤️</p>
//                 `
//             );
//         }

//         if (status === "out_for_delivery") {

//             console.log("ABOUT TO SEND EMAIL");
// console.log("Email:", order.shippingAddress.email);

//             await sendOrderEmail(
//                 order.shippingAddress.email,
//                 "Your Order is Out for Delivery 🚚",
//                 `
//                 <h2>Hello ${order.shippingAddress.name}</h2>

//                 <p>Your order is on the way.</p>

//                 <p><strong>Order ID:</strong> ${order._id}</p>

//                 <p>Please keep your phone available.</p>

//                 <br>

//                 <p>Fresh Bites Team ❤️</p>
//                 `
//             );
//         }

//         if (status === "delivered") {
//             await sendOrderEmail(
//                 order.shippingAddress.email,
//                 "Order Delivered 🎉",
//                 `
//                 <h2>Hello ${order.shippingAddress.name}</h2>

//                 <p>Your order has been delivered successfully.</p>

//                 <p><strong>Order ID:</strong> ${order._id}</p>

//                 <br>

//                 <p>Thank you for shopping with Fresh Bites.</p>

//                 <p>We hope to serve you again ❤️</p>
//                 `
//             );
//         }

//         if (status === "cancelled") {
//             await sendOrderEmail(
//                 order.shippingAddress.email,
//                 "Order Cancelled ❌",
//                 `
//                 <h2>Hello ${order.shippingAddress.name}</h2>

//                 <p>Your order has been cancelled.</p>

//                 <p><strong>Order ID:</strong> ${order._id}</p>

//                 <br>

//                 <p>If this was unexpected, please contact support.</p>

//                 <p>Fresh Bites Team</p>
//                 `
//             );
//         }

//         res.status(200).json({
//             success: true,
//             message: "Order status updated successfully",
//             order,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// // @desc    Cancel order
// // @route   PUT /api/orders/:id/cancel
// // @access  Private
// const cancelOrder = async (req, res) => {
//     try{
//         const order = await Order.findById(req.params.id);
//         if(!order){
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }
//         if(order.user.toString() !== req.user._id.toString()){
//             return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
//         }
//         if(!["pending", "confirmed"].includes(order.status)){
//             return res.status(400).json({ success: false, message: "Only pending or confirmed orders can be cancelled" });
//         }

//         order.status = "cancelled";
//         order.trackingHistory.push(initializeTracking("cancelled", "Order has been cancelled by the user"));
//         await order.save();

//         // res.json({ success: true, message: "Order cancelled successfully" });
//         res.json({ success: true, message: "Order cancelled successfully", order });
//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const getRecentOrders = async (req, res) => {
//   try {
//     const recentOrders = await Order.find()
//       .populate("user", "fullName email")
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.status(200).json(recentOrders);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching recent orders",
//     });
//   }
// };

// // @desc    Get all orders (Admin)
// // @route   GET /api/orders
// // @access  Admin

// const getOrders = async (req, res) => {
//     try {
//         const orders = await Order.find()
//             .populate("user", "fullName email")
//             .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: orders.length,
//             orders,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// module.exports = { placeOrder, getMyOrders, getOrderById, updateOrderStatus, cancelOrder, getRecentOrders, getOrders };


const Order = require("../models/Order");
const sendOrderEmail = require("../utils/sendOrderEmail");
const PDFDocument = require("pdfkit");

const getEstimatedDelivery = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 45);
  return d;
};

const initializeTracking = (status, message) => ({
  status,
  message,
  timestamp: new Date(),
});

// =======================================
// PLACE ORDER
// =======================================

const placeOrder = async (req, res) => {
  console.log("🚀 PLACE ORDER API HIT");

  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      couponCode,
      discount,
      finalTotal,
    } = req.body;

    console.log("REQ BODY:", req.body);
    console.log("Payment Method:", paymentMethod);

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    const requiredFields = [
      "name",
      "email",
      "phone",
      "country",
      "city",
      "postalCode",
    ];

    for (const field of requiredFields) {
      if (!shippingAddress?.[field]) {
        return res.status(400).json({
          success: false,
          message: `Shipping address missing field: ${field}`,
        });
      }
    }

    // ===========================
    // CALCULATE ORDER TOTAL
    // ===========================

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingFee = 30;

    const couponDiscount = Number(discount || 0);
    const appliedCoupon = couponCode || "";

    const total =
      finalTotal !== undefined && finalTotal !== null
        ? Number(finalTotal) + shippingFee
        : subtotal + shippingFee - couponDiscount;

    console.log("Shipping Address:", shippingAddress);
    console.log("Email:", shippingAddress.email);

    // ===========================
    // CREATE ORDER
    // ===========================

    const order = await Order.create({
      user: req.user._id,

      items,

      shippingAddress,

      subtotal,

      shippingFee,

      total,

      paymentMethod,

      paymentStatus:
        paymentMethod === "COD" ? "UnPaid" : "Paid",

      // Coupon Details
      couponCode: appliedCoupon,

      discount: couponDiscount,

      estimatedDelivery: getEstimatedDelivery(),

      trackingHistory: [
        initializeTracking(
          "pending",
          "Order placed and awaiting confirmation"
        ),
      ],
    });

    console.log("Saved Email:", order.shippingAddress.email);
    console.log("Saved Payment:", order.paymentMethod);
    console.log("Saved Coupon:", order.couponCode);
    console.log("Saved Discount:", order.discount);

    // =====================================
    // AUTO CONFIRM AFTER 10 SECONDS
    // =====================================

    setTimeout(async () => {
      try {
        const o = await Order.findById(order._id);

        if (o && o.status === "pending") {
          o.status = "confirmed";

          o.trackingHistory.push(
            initializeTracking(
              "confirmed",
              "Order confirmed and being prepared"
            )
          );

          await o.save();

          console.log("ABOUT TO SEND EMAIL");
          console.log(o.shippingAddress.email);

          await sendOrderEmail(
            o.shippingAddress.email,
            "Order Confirmed ✅",
            `
            <h2>Hello ${o.shippingAddress.name}</h2>

            <p>Your order has been confirmed.</p>

            <p>
              Order ID:
              <strong>${o._id}</strong>
            </p>

            <p>
              Our kitchen has started preparing your food.
            </p>

            <br>

            <p>
              Thank you for ordering from
              <strong>Fresh Bites</strong>
            </p>
            `
          );
        }
      } catch (err) {
        console.error("Error auto-confirming order:", err);
      }
    }, 10000);

    res.status(201).json({
      success: true,
      orderId: order._id,
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// GET MY ORDERS
// =======================================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// GET ORDER BY ID
// =======================================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "fullName email"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// // =======================================
// // DOWNLOAD INVOICE PDF
// // =======================================

// const downloadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Allow only the order owner to download
//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const doc = new PDFDocument({
//       margin: 40,
//     });

//     res.setHeader(
//       "Content-Type",
//       "application/pdf"
//     );

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=Invoice-${order._id}.pdf`
//     );

//     doc.pipe(res);

//     // =========================
//     // Header
//     // =========================

//     doc
//       .fontSize(24)
//       .text("Fresh Bites", {
//         align: "center",
//       });

//     doc.moveDown();

//     doc
//       .fontSize(18)
//       .text("INVOICE", {
//         align: "center",
//       });

//     doc.moveDown(2);

//     doc.fontSize(12);

//     doc.text(`Invoice No : ${order._id}`);
//     doc.text(
//       `Date : ${new Date(order.createdAt).toLocaleDateString()}`
//     );

//     doc.moveDown();

//     // =========================
//     // Customer
//     // =========================

//     doc.text(`Customer : ${order.shippingAddress.name}`);
//     doc.text(`Email : ${order.shippingAddress.email}`);
//     doc.text(`Phone : ${order.shippingAddress.phone}`);

//     doc.moveDown();

//     // =========================
//     // Items
//     // =========================

//     doc.fontSize(14).text("Items");

//     doc.moveDown(0.5);

//     order.items.forEach((item) => {
//       doc.text(
//         `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
//       );
//     });

//     doc.moveDown();

//     // =========================
//     // Totals
//     // =========================

//     doc.text(`Subtotal : ₹${order.subtotal}`);
//     doc.text(`Shipping : ₹${order.shippingFee}`);
//     doc.text(`Discount : -₹${order.discount || 0}`);

//     if (order.couponCode) {
//       doc.text(`Coupon : ${order.couponCode}`);
//     }

//     doc.moveDown();

//     doc
//       .fontSize(16)
//       .text(`Grand Total : ₹${order.total}`);

//     doc.moveDown();

//     doc.text(`Payment Method : ${order.paymentMethod}`);
//     doc.text(`Payment Status : ${order.paymentStatus}`);

//     doc.moveDown(2);

//     doc
//       .fontSize(12)
//       .text(
//         "Thank you for ordering from Fresh Bites!",
//         {
//           align: "center",
//         }
//       );

//     doc.end();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// const downloadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     const path = require("path");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const PDFDocument = require("pdfkit");

//     const doc = new PDFDocument({
//       size: "A4",
//       margin: 40,
//     });

//     res.setHeader("Content-Type", "application/pdf");

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=FreshBites-Invoice-${order._id}.pdf`
//     );

//     doc.pipe(res);

//     // =====================================
//     // HEADER
//     // =====================================

//     const logoPath = path.join(__dirname, "../assets/logo.png");

// doc.image(logoPath, 50, 40, {
//   width: 70,
// });

//     // doc
//     //   .roundedRect(0, 0, 595, 110, 0)
//     //   .fill("#ef4444");

//    doc
//   .fontSize(28)
//   .fillColor("#DC2626")
//   .text("Fresh Bites", 140, 45);

// doc
//   .fontSize(13)
//   .fillColor("#6B7280")
//   .text("AI Powered Food Ordering Platform", 140, 80);

//  doc
//   .roundedRect(400, 35, 150, 45, 8)
//   .fill("#DC2626");

// doc
//   .fillColor("white")
//   .font("Helvetica-Bold")
//   .fontSize(24)
//   .text("INVOICE", 418, 48);

// doc
//   .fillColor("#6B7280")
//   .font("Helvetica")
//   .fontSize(10)
//   .text(
//     `Invoice Date: ${new Date().toLocaleDateString("en-IN")}`,
//     418,
//     78
//   );

// doc
//   .font("Helvetica")
//   .fontSize(10)
//   .fillColor("#6B7280")
//   .text(
//     `Invoice Date: ${new Date().toLocaleDateString("en-IN")}`,
//     420,
//     78
//   );

//     doc.moveDown(5);

//     // =====================================
//     // CUSTOMER DETAILS BOX
//     // =====================================

//     const customerY = 140;

//     doc
//       .roundedRect(40, customerY, 240, 165, 8)
//       .fillAndStroke("#fff7ed", "#f97316");

//     doc
//       .fillColor("#ea580c")
//       .fontSize(15)
//       .font("Helvetica-Bold")
//       .text("Customer Details", 55, customerY + 15);

//     doc
//       .fillColor("#111827")
//       .fontSize(11)
//       .font("Helvetica")
//       .text(`Name : ${order.shippingAddress.name}`, 55, customerY + 45);

//     doc.text(
//       `Email : ${order.shippingAddress.email}`,
//       55,
//       customerY + 65
//     );

//     doc.text(
//       `Phone : ${order.shippingAddress.phone}`,
//       55,
//       customerY + 85
//     );

//     doc.text(
//       `Country : ${order.shippingAddress.country}`,
//       55,
//       customerY + 105
//     );

//     doc.text(
//       `City : ${order.shippingAddress.city}`,
//       55,
//       customerY + 125
//     );

//     doc.text(
//       `Postal Code : ${order.shippingAddress.postalCode}`,
//       55,
//       customerY + 145
//     );

//     // =====================================
//     // ORDER DETAILS BOX
//     // =====================================

//     doc
//       .roundedRect(315, customerY, 240, 165, 8)
//       .fillAndStroke("#eff6ff", "#3b82f6");

//     doc
//       .fillColor("#2563eb")
//       .fontSize(15)
//       .font("Helvetica-Bold")
//       .text("Order Details", 330, customerY + 15);

//     doc
//       .fillColor("#111827")
//       .fontSize(11)
//       .font("Helvetica")
//       .text(
//         `Invoice ID : ${order._id.toString().slice(-8).toUpperCase()}`,
//         330,
//         customerY + 45
//       );

//     doc.text(
//       `Order Date : ${new Date(order.createdAt).toLocaleDateString("en-IN")}`,
//       330,
//       customerY + 65
//     );

//     doc.text(
//       `Payment : ${order.paymentMethod}`,
//       330,
//       customerY + 85
//     );

//     doc.text(
//       `Payment Status : ${order.paymentStatus}`,
//       330,
//       customerY + 105
//     );

//     doc.text(
//       `Order Status : ${order.status}`,
//       330,
//       customerY + 125
//     );

//     doc.text(
//       `Delivery : ${
//         order.estimatedDelivery
//           ? new Date(order.estimatedDelivery).toLocaleTimeString("en-IN", {
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "N/A"
//       }`,
//       330,
//       customerY + 145
//     );

//     // =====================================
//     // ITEMS TABLE HEADER
//     // =====================================

//     let tableTop = 340;

//     doc
//       .roundedRect(40, tableTop, 515, 28, 4)
//       .fill("#ef4444");

//     doc
//       .fillColor("#ffffff")
//       .font("Helvetica-Bold")
//       .fontSize(11);

//     doc.text("Item", 55, tableTop + 9);
//     doc.text("Qty", 290, tableTop + 9);
//     doc.text("Price", 360, tableTop + 9);
//     doc.text("Total", 465, tableTop + 9);

//     tableTop += 40;

//         // =====================================
//     // ITEMS
//     // =====================================

//     doc.font("Helvetica").fontSize(10);

//     order.items.forEach((item, index) => {
//       const y = tableTop + index * 28;

//       if (index % 2 === 0) {
//         doc
//           .roundedRect(40, y - 4, 515, 24, 2)
//           .fill("#fff7ed");
//       }

//       doc.fillColor("#111827");

//       doc.text(item.name, 55, y);

//       doc.text(item.quantity.toString(), 300, y);

//       doc.text(`₹${item.price}`, 360, y);

//       doc.text(
//         `₹${item.price * item.quantity}`,
//         465,
//         y
//       );
//     });

//     tableTop += order.items.length * 28 + 20;

//     // =====================================
//     // BILL SUMMARY
//     // =====================================

//     const summaryX = 320;
//     const summaryY = tableTop;

//     doc
//       .roundedRect(summaryX, summaryY, 235, 170, 8)
//       .fillAndStroke("#f9fafb", "#d1d5db");

//     doc
//       .fillColor("#ef4444")
//       .font("Helvetica-Bold")
//       .fontSize(15)
//       .text("Bill Summary", summaryX + 15, summaryY + 15);

//     doc
//       .fillColor("#111827")
//       .font("Helvetica")
//       .fontSize(11);

//     doc.text(
//       "Subtotal",
//       summaryX + 15,
//       summaryY + 45
//     );

//     doc.text(
//       `₹${order.subtotal}`,
//       summaryX + 150,
//       summaryY + 45,
//       {
//         width: 60,
//         align: "right",
//       }
//     );

//     doc.text(
//       "Shipping",
//       summaryX + 15,
//       summaryY + 70
//     );

//     doc.text(
//       `₹${order.shippingFee}`,
//       summaryX + 150,
//       summaryY + 70,
//       {
//         width: 60,
//         align: "right",
//       }
//     );

//     // Coupon

//     if (order.couponCode) {
//       doc.fillColor("#16a34a");

//       doc.text(
//         `Coupon (${order.couponCode})`,
//         summaryX + 15,
//         summaryY + 95
//       );

//       doc.text(
//         `-₹${order.discount}`,
//         summaryX + 150,
//         summaryY + 95,
//         {
//           width: 60,
//           align: "right",
//         }
//       );
//     } else {
//       doc.fillColor("#6b7280");

//       doc.text(
//         "Coupon",
//         summaryX + 15,
//         summaryY + 95
//       );

//       doc.text(
//         "Not Applied",
//         summaryX + 115,
//         summaryY + 95
//       );
//     }

//     // Divider

//     doc
//       .moveTo(summaryX + 10, summaryY + 125)
//       .lineTo(summaryX + 225, summaryY + 125)
//       .stroke("#d1d5db");

//     // Grand Total

//     doc
//       .fillColor("#ef4444")
//       .font("Helvetica-Bold")
//       .fontSize(16);

//     doc.text(
//       "Grand Total",
//       summaryX + 15,
//       summaryY + 140
//     );

//     doc.text(
//       `₹${order.total}`,
//       summaryX + 135,
//       summaryY + 140,
//       {
//         width: 75,
//         align: "right",
//       }
//     );

//         // =====================================
//     // PAYMENT INFORMATION
//     // =====================================

//     const paymentY = summaryY;

//     doc
//       .roundedRect(40, paymentY, 240, 170, 8)
//       .fillAndStroke("#f0fdf4", "#22c55e");

//     doc
//       .fillColor("#16a34a")
//       .font("Helvetica-Bold")
//       .fontSize(15)
//       .text("Payment Details", 55, paymentY + 15);

//     doc
//       .fillColor("#111827")
//       .font("Helvetica")
//       .fontSize(11);

//     doc.text(
//       `Payment Method : ${order.paymentMethod}`,
//       55,
//       paymentY + 50
//     );

//     doc.text(
//       `Payment Status : ${order.paymentStatus}`,
//       55,
//       paymentY + 75
//     );

//     doc.text(
//       `Order Status : ${order.status}`,
//       55,
//       paymentY + 100
//     );

//     doc.text(
//       `Estimated Delivery`,
//       55,
//       paymentY + 125
//     );

//     doc.text(
//       order.estimatedDelivery
//         ? new Date(order.estimatedDelivery).toLocaleString("en-IN")
//         : "N/A",
//       55,
//       paymentY + 145
//     );

//   // =====================================
// // FOOTER
// // =====================================
// const footerY = 705;

// doc
//   .strokeColor("#F97316")
//   .lineWidth(1)
//   .moveTo(50, footerY)
//   .lineTo(545, footerY)
//   .stroke();

// doc
//   .fillColor("#DC2626")
//   .font("Helvetica-Bold")
//   .fontSize(18)
//   .text("Thank You for Ordering!", 40, footerY + 18, {
//     width: 515,
//     align: "center",
//   });

// doc
//   .fillColor("#4B5563")
//   .font("Helvetica")
//   .fontSize(10)
//   .text(
//     "We truly appreciate your trust in Fresh Bites.",
//     40,
//     footerY + 48,
//     {
//       width: 515,
//       align: "center",
//     }
//   );

// doc.text(
//   "Your delicious meal is prepared with freshness and delivered with care.",
//   40,
//   footerY + 63,
//   {
//     width: 515,
//     align: "center",
//   }
// );

// doc
//   .fillColor("#6B7280")
//   .fontSize(9)
//   .text(
//     "Fresh Bites • AI Powered Food Ordering Platform",
//     40,
//     footerY + 88,
//     {
//       width: 515,
//       align: "center",
//     }
//   );

// doc.text(
//   "support@freshbites.com | +91 98765 43210 | www.freshbites.com",
//   40,
//   footerY + 102,
//   {
//     width: 515,
//     align: "center",
//   });

// doc
//   .fillColor("#9CA3AF")
//   .fontSize(8)
//   .text(
//     "This is a computer-generated invoice and does not require a signature.",
//     40,
//     footerY + 120,
//     {
//       width: 515,
//       align: "center",
//     }
//   );

//     // =====================================
//     // FINISH PDF
//     // =====================================

//     doc.end();
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const PDFDocument = require("pdfkit");
    const path = require("path");

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      // bufferPages: true,
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=FreshBites-Invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // =====================================================
    // COLORS
    // =====================================================

    const RED = "#DC2626";
    const ORANGE = "#F97316";
    const GREEN = "#16A34A";
    const BLUE = "#2563EB";
    const DARK = "#1F2937";
    const GRAY = "#6B7280";
    const LIGHT = "#F9FAFB";

    // =====================================================
    // HEADER BACKGROUND
    // =====================================================

    doc
      .roundedRect(20, 20, 555, 105, 12)
      .fill(RED);

    // =====================================================
    // LOGO
    // =====================================================

    const logoPath = path.join(
      __dirname,
      "../assets/logo.png"
    );

    try {
      doc.image(logoPath, 40, 38, {
        width: 60,
      });
    } catch (err) {
      console.log("Logo not found.");
    }

    // =====================================================
    // COMPANY NAME
    // =====================================================

    doc
      .fillColor("#FFFFFF")
      .font("Helvetica-Bold")
      .fontSize(28)
      .text("Fresh Bites", 115, 42);

    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        "AI Powered Food Ordering Platform",
        115,
        76
      );

    // =====================================================
    // INVOICE BOX
    // =====================================================

    doc
      .roundedRect(415, 42, 130, 42, 8)
      .fill("#FFFFFF");

    doc
      .fillColor(RED)
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("INVOICE", 430, 53);

    // =====================================================
    // DATE
    // =====================================================

    doc
      .fillColor("#FFFFFF")
      .fontSize(10)
      .font("Helvetica")
      .text(
        `Invoice Date : ${new Date().toLocaleDateString(
          "en-IN"
        )}`,
        400,
        96
      );

    // =====================================================
    // START CONTENT
    // =====================================================

    let currentY = 150;

        // =====================================================
    // CUSTOMER DETAILS
    // =====================================================

    doc
      .roundedRect(40, currentY, 240, 170, 10)
      .fillAndStroke("#FFF7ED", ORANGE);

    doc
      .fillColor(ORANGE)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Customer Details", 55, currentY + 15);

    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(11);

    doc.text(
      `Name : ${order.shippingAddress.name}`,
      55,
      currentY + 45
    );

    doc.text(
      `Email : ${order.shippingAddress.email}`,
      55,
      currentY + 68
    );

    doc.text(
      `Phone : ${order.shippingAddress.phone}`,
      55,
      currentY + 91
    );

    doc.text(
      `Country : ${order.shippingAddress.country}`,
      55,
      currentY + 114
    );

    doc.text(
      `City : ${order.shippingAddress.city}`,
      55,
      currentY + 137
    );

    doc.text(
      `Postal Code : ${order.shippingAddress.postalCode}`,
      55,
      currentY + 160
    );

    // =====================================================
    // ORDER DETAILS
    // =====================================================

    doc
      .roundedRect(315, currentY, 240, 170, 10)
      .fillAndStroke("#EFF6FF", BLUE);

    doc
      .fillColor(BLUE)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Order Details", 330, currentY + 15);

    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(11);

    doc.text(
      `Invoice ID : ${order._id
        .toString()
        .slice(-8)
        .toUpperCase()}`,
      330,
      currentY + 45
    );

    doc.text(
      `Order Date : ${new Date(
        order.createdAt
      ).toLocaleDateString("en-IN")}`,
      330,
      currentY + 68
    );

    doc.text(
      `Payment Method : ${order.paymentMethod}`,
      330,
      currentY + 91
    );

    doc.text(
      `Payment Status : ${order.paymentStatus}`,
      330,
      currentY + 114
    );

    doc.text(
      `Order Status : ${order.status}`,
      330,
      currentY + 137
    );

    doc.text(
      `Delivery : ${
        order.estimatedDelivery
          ? new Date(
              order.estimatedDelivery
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A"
      }`,
      330,
      currentY + 160
    );

    // =====================================================
    // ITEMS TABLE HEADER
    // =====================================================

    currentY += 205;

    doc
      .roundedRect(40, currentY, 515, 30, 5)
      .fill(RED);

    doc
      .fillColor("#FFFFFF")
      .font("Helvetica-Bold")
      .fontSize(11);

    doc.text("Item", 55, currentY + 10);

    doc.text("Qty", 290, currentY + 10);

    doc.text("Price", 360, currentY + 10);

    doc.text("Total", 470, currentY + 10);

    currentY += 40;

    // =====================================================
    // ITEMS
    // =====================================================

    doc
      .font("Helvetica")
      .fontSize(10);

   order.items.forEach((item, index) => {

    if (currentY > 690) {
        doc.addPage();
        currentY = 60;

        // Draw the table header again
        doc
          .roundedRect(40, currentY, 515, 30, 5)
          .fill(RED);

        doc
          .fillColor("#FFFFFF")
          .font("Helvetica-Bold")
          .fontSize(11);

        doc.text("Item", 55, currentY + 10);
        doc.text("Qty", 290, currentY + 10);
        doc.text("Price", 360, currentY + 10);
        doc.text("Total", 470, currentY + 10);

        currentY += 40;
    }


});

    currentY += 20;


        // =====================================================
    // BILL SUMMARY
    // =====================================================

    if (currentY + 200 > 760) {
    doc.addPage();
    currentY = 60;
}

    const summaryY = currentY;

    doc
      .roundedRect(320, summaryY, 235, 175, 10)
      .fillAndStroke(LIGHT, "#D1D5DB");

    doc
      .fillColor(RED)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Bill Summary", 335, summaryY + 15);

    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(11);

    // -------------------------
    // Subtotal
    // -------------------------

    doc.text(
      "Subtotal",
      335,
      summaryY + 45
    );

    doc.text(
      `₹${order.subtotal}`,
      470,
      summaryY + 45,
      {
        width: 60,
        align: "right",
      }
    );

    // -------------------------
    // Shipping
    // -------------------------

    doc.text(
      "Shipping",
      335,
      summaryY + 70
    );

    doc.text(
      `₹${order.shippingFee}`,
      470,
      summaryY + 70,
      {
        width: 60,
        align: "right",
      }
    );

    // -------------------------
    // Coupon
    // -------------------------

    if (order.couponCode) {

      doc
        .fillColor(GREEN)
        .font("Helvetica-Bold");

      doc.text(
        `Coupon (${order.couponCode})`,
        335,
        summaryY + 95
      );

      doc.text(
        `-₹${order.discount}`,
        470,
        summaryY + 95,
        {
          width: 60,
          align: "right",
        }
      );

    } else {

      doc
        .fillColor(GRAY)
        .font("Helvetica");

      doc.text(
        "Coupon",
        335,
        summaryY + 95
      );

      doc.text(
        "Not Applied",
        430,
        summaryY + 95
      );

    }

    // -------------------------
    // Divider
    // -------------------------

    doc
      .strokeColor("#D1D5DB")
      .lineWidth(1);

    doc.moveTo(330, summaryY + 125)
       .lineTo(545, summaryY + 125)
       .stroke();

    // -------------------------
    // Grand Total
    // -------------------------

    doc
      .fillColor(RED)
      .font("Helvetica-Bold")
      .fontSize(17);

    doc.text(
      "Grand Total",
      335,
      summaryY + 142
    );

    doc.text(
      `₹${order.total}`,
      455,
      summaryY + 142,
      {
        width: 80,
        align: "right",
      }
    );

    // =====================================================
    // PAYMENT DETAILS
    // =====================================================

    doc
      .roundedRect(40, summaryY, 240, 175, 10)
      .fillAndStroke("#F0FDF4", GREEN);

    doc
      .fillColor(GREEN)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text(
        "Payment Details",
        55,
        summaryY + 15
      );

    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(11);

    doc.text(
      `Payment Method : ${order.paymentMethod}`,
      55,
      summaryY + 48
    );

    doc.text(
      `Payment Status : ${order.paymentStatus}`,
      55,
      summaryY + 73
    );

    doc.text(
      `Order Status : ${order.status}`,
      55,
      summaryY + 98
    );

    doc.text(
      "Estimated Delivery",
      55,
      summaryY + 123
    );

    doc.text(
      order.estimatedDelivery
        ? new Date(
            order.estimatedDelivery
          ).toLocaleString("en-IN")
        : "N/A",
      55,
      summaryY + 146
    );

    currentY = summaryY + 205;


        // =====================================================
    // FOOTER
    // =====================================================

    // Keep footer on same page
    if (currentY + 170 > 760){
      doc.addPage();
      currentY = 60;
    }

    doc
      .strokeColor(ORANGE)
      .lineWidth(1)
      .moveTo(40, currentY)
      .lineTo(555, currentY)
      .stroke();

    currentY += 20;

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor(RED)
      .text(
        "Thank You for Ordering!",
        40,
        currentY,
        {
          width: 515,
          align: "center",
        }
      );

    currentY += 30;

    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(DARK)
      .text(
        "We truly appreciate your trust in Fresh Bites.",
        40,
        currentY,
        {
          width: 515,
          align: "center",
        }
      );

    currentY += 18;

    doc.text(
      "Your delicious meal is prepared with freshness and delivered with care.",
      40,
      currentY,
      {
        width: 515,
        align: "center",
      }
    );

    currentY += 35;

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(RED)
      .text(
        "Fresh Bites",
        40,
        currentY,
        {
          width: 515,
          align: "center",
        }
      );

    currentY += 18;

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(GRAY)
      .text(
        "AI Powered Food Ordering Platform",
        40,
        currentY,
        {
          width: 515,
          align: "center",
        }
      );

    currentY += 20;

    doc.text(
      "Email: support@freshbites.com",
      40,
      currentY,
      {
        width: 515,
        align: "center",
      }
    );

    currentY += 16;

    doc.text(
      "Phone: +91 98765 43210",
      40,
      currentY,
      {
        width: 515,
        align: "center",
      }
    );

    currentY += 16;

    doc.text(
      "Website: www.freshbites.com",
      40,
      currentY,
      {
        width: 515,
        align: "center",
      }
    );

    currentY += 30;

    doc
      .fillColor("#9CA3AF")
      .fontSize(9)
      .text(
        "This is a computer-generated invoice and does not require a signature.",
        40,
        currentY,
        {
          width: 515,
          align: "center",
        }
      );

    currentY += 25;

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(GREEN)
      .text(
        "We hope to serve you again. Have a wonderful day!",
        40,
        currentY,
        {
          width: 515,
          align: "center",
        }
      );

    // =====================================================
    // FINISH PDF
    // =====================================================

    doc.end();

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

















// =======================================
// UPDATE ORDER STATUS (ADMIN)
// =======================================

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    order.trackingHistory.push({
      status,
      message: `Order status changed to ${status}`,
      timestamp: new Date(),
    });

    await order.save();

    // ==========================
    // EMAIL NOTIFICATIONS
    // ==========================

    if (status === "preparing") {
      await sendOrderEmail(
        order.shippingAddress.email,
        "Your Order is Being Prepared 👨‍🍳",
        `
        <h2>Hello ${order.shippingAddress.name}</h2>

        <p>Your order is now being prepared by our kitchen.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <p>We'll notify you when it is out for delivery.</p>

        <br>

        <p>Fresh Bites Team ❤️</p>
        `
      );
    }

    if (status === "out_for_delivery") {
      await sendOrderEmail(
        order.shippingAddress.email,
        "Your Order is Out for Delivery 🚚",
        `
        <h2>Hello ${order.shippingAddress.name}</h2>

        <p>Your order is on the way.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <p>Please keep your phone available.</p>

        <br>

        <p>Fresh Bites Team ❤️</p>
        `
      );
    }

    if (status === "delivered") {
      // Automatically mark payment paid for COD orders
      if (order.paymentMethod === "COD") {
        order.paymentStatus = "Paid";
        await order.save();
      }

      await sendOrderEmail(
        order.shippingAddress.email,
        "Order Delivered 🎉",
        `
        <h2>Hello ${order.shippingAddress.name}</h2>

        <p>Your order has been delivered successfully.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <br>

        <p>Thank you for shopping with Fresh Bites.</p>

        <p>We hope to serve you again ❤️</p>
        `
      );
    }

    if (status === "cancelled") {
      await sendOrderEmail(
        order.shippingAddress.email,
        "Order Cancelled ❌",
        `
        <h2>Hello ${order.shippingAddress.name}</h2>

        <p>Your order has been cancelled.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <br>

        <p>If this was unexpected, please contact support.</p>

        <p>Fresh Bites Team</p>
        `
      );
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// CANCEL ORDER
// =======================================

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order",
      });
    }

    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Only pending or confirmed orders can be cancelled",
      });
    }

    order.status = "cancelled";

    order.trackingHistory.push(
      initializeTracking(
        "cancelled",
        "Order has been cancelled by the user"
      )
    );

    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================================
// GET RECENT ORDERS
// =======================================

const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      orders: recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recent orders",
    });
  }
};

// =======================================
// GET ALL ORDERS (ADMIN)
// =======================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// EXPORTS
// =======================================

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  downloadInvoice,
  updateOrderStatus,
  cancelOrder,
  getRecentOrders,
  getOrders,
};