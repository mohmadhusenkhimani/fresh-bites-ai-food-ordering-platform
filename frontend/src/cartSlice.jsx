// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //     items: JSON.parse(localStorage.getItem("cartItem")) || []
// // };

// // const cartSlice = createSlice({
// //     name: "carts",
// //     initialState,
// //     reducers: {
// //         addToCart: (state, action) => {
// //             // Ensure items is always an array
// //             if (!Array.isArray(state.items)) {
// //                 state.items = [];
// //             }
// //             const item = action.payload;
// //             // const existing = state.items.find((i) => i.id === item.id);
// //             const existing = state.items.find(
// //   (i) => (i._id || i.id) === (item._id || item.id)
// // );

// //             if (existing) {
// //                 existing.quantity += 1;
// //             } else {
// //                 state.items.push({ ...item, quantity: 1 });
// //             }

// //             localStorage.setItem("cartItem", JSON.stringify(state.items));
// //         },


// //         removeFromCart: (state, action) => {
// //             // state.items = state.items.filter(i => i.id !== action.payload);
// //             state.items = state.items.filter(
// //   i => (i._id || i.id) !== action.payload
// // );
// //             localStorage.setItem("cartItem", JSON.stringify(state.items));
// //         },
// //         increment(state, action) {
// //     let abc = state.items.find(
// //       (i) => (i._id || i.id) === action.payload
// //     );

// //     if (abc) {
// //         abc.quantity += 1;
// //     }

// //     localStorage.setItem(
// //       "cartItem",
// //       JSON.stringify(state.items)
// //     );
// // },
// //         decrement(state, action) {
// //             // let abc = state.items.find((i) => i.id == action.payload)
// //             let abc = state.items.find(
// //   (i) => (i._id || i.id) === action.payload
// // );
// //             if (abc) {
// //                 if (abc.quantity > 1) {
// //                     abc.quantity -= 1

// //                 }
// //                 else {
// //                     // state.filter((i) => i.id !== action.payload)
// //                     state.items = state.items.filter(
// //   (i) => (i._id || i.id) !== action.payload
// // );
// //                 }
// //             }
// //             // localStorage.setItem("cartItem", JSON.stringify(state))
// //             localStorage.setItem(
// //   "cartItem",
// //   JSON.stringify(state.items)
// // );
// //         },


// //         clearCart: (state) => {
// //             state.items = [];
// //             localStorage.removeItem("cartItem");
// //         }
// //     }
// // });

// // export const { addToCart, removeFromCart, clearCart, increment, decrement } = cartSlice.actions;
// // export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // Safely load cart from localStorage
// const savedCart = JSON.parse(localStorage.getItem("cartItem"));

// const initialState = {
//   items: Array.isArray(savedCart) ? savedCart : [],
// };

// const cartSlice = createSlice({
//   name: "carts",
//   initialState,

//   reducers: {
//     // Add Product
//     addToCart: (state, action) => {
//       const item = action.payload;

//       const existing = state.items.find(
//         (i) => (i._id || i.id) === (item._id || item.id)
//       );

//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({
//           ...item,
//           quantity: 1,
//         });
//       }

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Remove Product
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (i) => (i._id || i.id) !== action.payload
//       );

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Increase Quantity
//     increment: (state, action) => {
//       const item = state.items.find(
//         (i) => (i._id || i.id) === action.payload
//       );

//       if (item) {
//         item.quantity += 1;
//       }

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Decrease Quantity
//     decrement: (state, action) => {
//       const item = state.items.find(
//         (i) => (i._id || i.id) === action.payload
//       );

//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           state.items = state.items.filter(
//             (i) => (i._id || i.id) !== action.payload
//           );
//         }
//       }

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Clear Entire Cart
//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cartItem");
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   increment,
//   decrement,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // Load cart from localStorage safely
// const savedCart = JSON.parse(localStorage.getItem("cartItem"));

// const initialState = {
//   items: Array.isArray(savedCart) ? savedCart : [],
// };

// const getItemId = (item) => item._id || item.id;

// const cartSlice = createSlice({
//   name: "carts",
//   initialState,

//   reducers: {
//     // Add Item
//     addToCart: (state, action) => {
//       const item = action.payload;

//       const existingItem = state.items.find(
//         (cartItem) =>
//           getItemId(cartItem) === getItemId(item)
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({
//           ...item,
//           quantity: 1,
//         });
//       }

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Remove Item Completely
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => getItemId(item) !== action.payload
//       );

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Increase Quantity
//     increment: (state, action) => {
//       const item = state.items.find(
//         (item) => getItemId(item) === action.payload
//       );

//       if (item) {
//         item.quantity += 1;
//       }

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Decrease Quantity
//     decrement: (state, action) => {
//       const item = state.items.find(
//         (item) => getItemId(item) === action.payload
//       );

//       if (!item) return;

//       if (item.quantity > 1) {
//         item.quantity -= 1;
//       } else {
//         state.items = state.items.filter(
//           (item) => getItemId(item) !== action.payload
//         );
//       }

//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify(state.items)
//       );
//     },

//     // Clear Cart
//     clearCart: (state) => {
//       state.items = [];

//       localStorage.removeItem("cartItem");
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   increment,
//   decrement,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage safely
const savedCart = JSON.parse(localStorage.getItem("cartItem"));
const savedCoupon = JSON.parse(localStorage.getItem("coupon"));

const initialState = {
  items: Array.isArray(savedCart) ? savedCart : [],

  // Coupon
  appliedCoupon: savedCoupon?.code || null,
  couponDiscount: savedCoupon?.discount || 0,
};

const getItemId = (item) => item._id || item.id;

const cartSlice = createSlice({
  name: "carts",
  initialState,

  reducers: {
    // Add Item
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (cartItem) => getItemId(cartItem) === getItemId(item)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
  ...item,
  quantity: item.quantity || 1,
});
      }

      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },

    // Remove Item Completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => getItemId(item) !== action.payload
      );

      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },

    // Increase Quantity
    increment: (state, action) => {
      const item = state.items.find(
        (item) => getItemId(item) === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },

    // Decrease Quantity
    decrement: (state, action) => {
      const item = state.items.find(
        (item) => getItemId(item) === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => getItemId(item) !== action.payload
        );
      }

      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },

    // Apply Coupon
    applyCoupon: (state, action) => {
      state.appliedCoupon = action.payload.code;
      state.couponDiscount = action.payload.discount;

      localStorage.setItem(
        "coupon",
        JSON.stringify({
          code: action.payload.code,
          discount: action.payload.discount,
        })
      );
    },

    // Remove Coupon
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.couponDiscount = 0;

      localStorage.removeItem("coupon");
    },

    // Clear Cart
    clearCart: (state) => {
      state.items = [];

      state.appliedCoupon = null;
      state.couponDiscount = 0;

      localStorage.removeItem("cartItem");
      localStorage.removeItem("coupon");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;