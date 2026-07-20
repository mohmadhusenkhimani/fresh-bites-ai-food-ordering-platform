// // const mongoose = require("mongoose");

// // const orderItemSchema = new mongoose.Schema({
// //     foodId: { type: String, required: true },
// //     name: { type: String, required: true },
// //     price: { type: Number, required: true },
// //     quantity: { type: Number, required: true, min: 1 },
// //     image: { type: String, default: "" },
// // });

// // const trackingStepSchema = new mongoose.Schema({
// //     status: { type: String, required: true },
// //     message: { type: String, required: true },
// //     timestamp: { type: Date, default: Date.now },
// // });

// // const orderSchema = new mongoose.Schema(
// //     {
// //         user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //         items: { 
// //             type: [orderItemSchema],
// //             required: true,
// //             validate: { validator: (v) => v.length > 0, message: "Order must have at least one item" },
// //         },
// //         shippingAddress: {
// //             name: { type: String, required: true },
// //             email: { type: String, required: true },
// //             phone: { type: String, required: true },
// //             country: { type: String, required: true },
// //             city: { type: String, required: true },
// //             postalCode: { type: String, required: true },
// //         },
// //         subtotal: { type: Number, required: true},
// //         shippingFee: { type: Number, default: 30 },
// //         total: { type: Number, required: true },
// //         status: {
// //             type: String,
// //             enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
// //             default: "pending",
// //         },
// //         paymentStatus: { type: String, enum: ["UnPaid", "Paid", "Failed"], default: "Paid" },
// //         trackingHistory: { type: [trackingStepSchema], default: [] },
// //         estimatedDelivery: { type: Date },
// //     },
// //     { timestamps: true }
// // );

// // module.exports = mongoose.model("Order", orderSchema);

// const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//   foodId: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true, min: 1 },
//   image: { type: String, default: "" },
// });

// const trackingStepSchema = new mongoose.Schema({
//   status: { type: String, required: true },
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: {
//       type: [orderItemSchema],
//       required: true,
//       validate: {
//         validator: (v) => v.length > 0,
//         message: "Order must have at least one item",
//       },
//     },

//     shippingAddress: {
//       name: { type: String, required: true },
//       email: { type: String, required: true },
//       phone: { type: String, required: true },
//       country: { type: String, required: true },
//       city: { type: String, required: true },
//       postalCode: { type: String, required: true },
//     },

//     subtotal: {
//   type: Number,
//   required: true,
// },

// // Coupon Information
// couponCode: {
//   type: String,
//   default: "",
// },

// discount: {
//   type: Number,
//   default: 0,
// },

// shippingFee: {
//   type: Number,
//   default: 30,
// },

// total: {
//   type: Number,
//   required: true,
// },
//     // NEW FIELD
//     paymentMethod: {
//       type: String,
//       enum: ["COD", "UPI"],
//       default: "COD",
//     },

//     // paymentStatus: {
//     //   type: String,
//     //   enum: ["UnPaid", "Paid", "Failed"],
//     //   default: "Paid",
//     // },

//     paymentStatus: {
//   type: String,
//   enum: ["UnPaid", "Paid", "Failed"],
//   default: "UnPaid",
// },

//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "confirmed",
//         "preparing",
//         "out_for_delivery",
//         "delivered",
//         "cancelled",
//       ],
//       default: "pending",
//     },

//     trackingHistory: {
//       type: [trackingStepSchema],
//       default: [],
//     },

//     estimatedDelivery: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  image: {
    type: String,
    default: "",
  },
});

const trackingStepSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "Order must have at least one item",
      },
    },

    shippingAddress: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },
    },

    // Cart Total Before Discount
    subtotal: {
      type: Number,
      required: true,
    },

    // Applied Coupon Code
    couponCode: {
      type: String,
      default: "",
    },

    // Discount Amount
    discount: {
      type: Number,
      default: 0,
    },

    // Shipping Charge
    shippingFee: {
      type: Number,
      default: 30,
    },

    // Final Amount
    total: {
      type: Number,
      required: true,
    },

    // Payment Method
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI"],
      default: "COD",
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: ["UnPaid", "Paid", "Failed"],
      default: "UnPaid",
    },

    // Order Status
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    // Tracking History
    trackingHistory: {
      type: [trackingStepSchema],
      default: [],
    },

    // Estimated Delivery Time
    estimatedDelivery: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);