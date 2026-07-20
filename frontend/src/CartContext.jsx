// import { createContext, useContext, useState } from "react";

// const CartContext = createContext(null);

// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used inside CartProvider");
//   }

//   return context;
// };
// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);


//   // Add item to cart
//   const addToCart = (item) => {
//     // Check if item already exists
//     const exists = cartItems.find((i) => i.id === item.id);
//     if (exists) {
//       setCartItems(
//         cartItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
    
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCartItems([]);
//   };
  

//   const value = { cartItems, addToCart, removeFromCart, clearCart };
  

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Add item to cart
  // const addToCart = (item) => {
  //   const exists = cartItems.find((i) => i.id === item.id);

  //   if (exists) {
  //     setCartItems(
  //       cartItems.map((i) =>
  //         i.id === item.id
  //           ? { ...i, quantity: i.quantity + 1 }
  //           : i
  //       )
  //     );
  //   } else {
  //     setCartItems([
  //       ...cartItems,
  //       {
  //         ...item,
  //         quantity: 1,
  //       },
  //     ]);
  //   }
  // };

  const addToCart = (item) => {
  console.log("Adding to cart:", item);

  const exists = cartItems.find((i) => i.id === item.id);

  if (exists) {
    setCartItems(
      cartItems.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  } else {
    setCartItems([
      ...cartItems,
      {
        ...item,
        quantity: 1,
      },
    ]);
  }
};

  // Remove item
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);

    // Also clear coupon when cart is emptied
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // Apply Coupon
  const applyCoupon = (couponCode, discountAmount) => {
    setAppliedCoupon(couponCode);
    setCouponDiscount(discountAmount);
  };

  // Remove Coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,

    // Coupon
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}